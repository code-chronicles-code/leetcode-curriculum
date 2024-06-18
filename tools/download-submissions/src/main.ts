import fsPromises from "node:fs/promises";
import nullthrows from "nullthrows";
import process from "process";

import {
  SUBMISSION_STATUS_TO_ABBREVIATION,
  getSubmissionList,
  type Submission,
} from "@code-chronicles/leetcode-api";

// TODO: Make into a shared utility?
import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

// TODO: Verify that this is an exhaustive list of LeetCode languages.
const LANGUAGE_TO_FILE_EXTENSION: Record<string, string> = {
  bash: "sh",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  dart: "dart",
  elixir: "ex",
  erlang: "erl",
  golang: "go",
  java: "java",
  javascript: "js",
  kotlin: "kt",
  mssql: "sql",
  mysql: "sql",
  php: "php",
  python: "py",
  python3: "py",
  pythondata: "py",
  racket: "rkt",
  ruby: "rb",
  rust: "rs",
  scala: "scala",
  swift: "swift",
  typescript: "ts",
};

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

// TODO: Make into a shared utility?
function timestampToDate(timestampInSeconds: number): string {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestampInSeconds * 1000));

  return ["year", "month", "day"]
    .map((partType) => nullthrows(parts.find((p) => p.type === partType)).value)
    .join("");
}

function getFilenameForSubmission({
  id,
  lang,
  timestamp,
  status_display,
}: TransformedSubmission): string {
  const extension = LANGUAGE_TO_FILE_EXTENSION[lang] ?? "txt";
  const date = timestampToDate(timestamp);
  const resultAbbreviation = nullthrows(
    SUBMISSION_STATUS_TO_ABBREVIATION[
      status_display as keyof typeof SUBMISSION_STATUS_TO_ABBREVIATION
    ],
  ).toLowerCase();

  return `${date}-${id}-${resultAbbreviation}.${extension}`;
}

const PROBLEMS_PER_GROUP = 100;

function padProblemNumber(n: number): string {
  return n.toString().padStart(4, "0");
}

function getDirnameForSubmission(submission: TransformedSubmission): string {
  const { questionFrontendId, titleSlug } = submission.question;
  const start =
    questionFrontendId - (questionFrontendId % PROBLEMS_PER_GROUP) + 1;
  const end = start - 1 + PROBLEMS_PER_GROUP;

  return [
    "submissions",
    `${padProblemNumber(start)}-${padProblemNumber(end)}`,
    `${padProblemNumber(questionFrontendId)}-${titleSlug}`,
  ].join("/");
}

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
        // eslint-disable-next-line no-await-in-loop
        data = await getSubmissionList({
          session: secrets.leetcodeSessionCookie,
          // TODO: Don't hardcode the 20, export the constant from the API library.
          page: Math.floor(submissionsMap.size / 20),
        });
      } catch (e) {
        // eslint-disable-next-line no-await-in-loop
        await writeSubmissions();
        console.error("Sleeping because of an error:", e);
        // eslint-disable-next-line no-await-in-loop
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

        const dir = getDirnameForSubmission(submission);
        // eslint-disable-next-line no-await-in-loop
        await fsPromises.mkdir(dir, { recursive: true });

        const filename = getFilenameForSubmission(submission);
        // eslint-disable-next-line no-await-in-loop
        await fsPromises.writeFile(`${dir}/${filename}`, code);
      }

      console.error(
        `Downloaded data on ${[submissionsMap.size]} submissions so far.`,
      );

      if (!data.has_next) {
        break;
      }

      if (Math.random() < 0.1) {
        // eslint-disable-next-line no-await-in-loop
        await writeSubmissions();
      }

      console.error("Sleeping...");
      // eslint-disable-next-line no-await-in-loop
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
