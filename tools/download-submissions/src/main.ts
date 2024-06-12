import fsPromises from "node:fs/promises";
import process from "process";

import {
  getSubmissionList,
  type Submission,
} from "@code-chronicles/leetcode-api";

// TODO: Make into a shared utility?
import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

function transformSubmission({ code, compare_result, ...rest }: Submission): {
  code: string;
  submission: Omit<
    // Separate the code from the submission, since we're saving it in
    // separate files.
    Omit<Submission, "code">,
    // Stringifying the compare_result was taking up too much space so
    // representing it as a string of 0s and 1s instead of an array of
    // booleans. This is actually the same format that the API originally
    // returns.
    "compare_result"
  > & {
    compare_result: string | null;
  };
} {
  return {
    code,
    submission: {
      ...rest,
      compare_result: compare_result?.map(Number).join("") ?? null,
    },
  };
}

type TransformedSubmission = ReturnType<
  typeof transformSubmission
>["submission"];

const SUMMARY_FILE = "submissions.json";

async function main(): Promise<void> {
  const submissionsMap = new Map<string, TransformedSubmission>();

  const writeSubmissions = async () => {
    const submissions = [...submissionsMap.values()].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    await fsPromises.writeFile(
      SUMMARY_FILE,
      JSON.stringify(submissions, null, 2) + "\n",
    );
  };

  const priorSubmissionsMap: Map<string, TransformedSubmission> =
    await fsPromises.readFile(SUMMARY_FILE, { encoding: "utf8" }).then(
      (data) =>
        new Map(
          (JSON.parse(data) as TransformedSubmission[]).map((s) => [s.id, s]),
        ),
      (e) => {
        if (e.code === "ENOENT") {
          return new Map();
        }
        throw e;
      },
    );
  console.error(
    `Prior data available on ${[priorSubmissionsMap.size]} submissions so far.`,
  );
  let latestPriorSubmissionTimestamp = Math.min(
    ...Array.from(priorSubmissionsMap.values()).map((s) => s.timestamp),
  );

  try {
    while (true) {
      let data;
      try {
        console.error("Fetching...");
        data = await getSubmissionList({
          session: secrets.leetcodeSessionCookie,
          // TODO: Don't hardcode the 20, export the constant from the API library.
          page: Math.floor(submissionsMap.size / 20),
        });
      } catch (e) {
        await writeSubmissions();
        console.error("Sleeping because of an error:", e);
        await sleep(60000);
        continue;
      }

      for (const { code, submission } of data.submissions_dump.map(
        transformSubmission,
      )) {
        submissionsMap.set(submission.id, submission);

        if (submission.timestamp >= latestPriorSubmissionTimestamp) {
          console.error("Merging with prior submissions!");
          for (const priorSubmission of priorSubmissionsMap.values()) {
            if (!submissionsMap.has(priorSubmission.id)) {
              submissionsMap.set(priorSubmission.id, priorSubmission);
            }
          }

          latestPriorSubmissionTimestamp = Infinity;
          priorSubmissionsMap.clear();
        }

        // TODO: Maybe batch? This isn't the slow part of this script anyway.
        console.error(`Saving submission ${submission.id} to a file.`);
        await fsPromises.writeFile(`submissions/${submission.id}.txt`, code);
      }

      console.error(
        `Downloaded data on ${[submissionsMap.size]} submissions so far.`,
      );

      if (!data.has_next) {
        break;
      }

      if (Math.random() < 0.1) {
        await writeSubmissions();
      }

      console.error("Sleeping...");
      await sleep(3000);
    }
  } finally {
    await writeSubmissions();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
