import fsPromises from "node:fs/promises";
import process from "node:process";

import { getSubmissionList } from "@code-chronicles/leetcode-api";
import { sleep } from "@code-chronicles/util/sleep";

import { getFilenameForSubmission } from "./getFilenameForSubmission";
import { getDirnameForSubmission } from "./getDirnameForSubmission";
import { readSecrets } from "./readSecrets";
import {
  transformSubmission,
  type TransformedSubmission,
} from "./transformSubmission";

const METADATA_FILE = "submissions.jsonl";
const HASHES_FILE = "submissions.sha512";

async function main(): Promise<void> {
  // TODO: maybe create the file from a template if it doesn't exist
  const { leetcodeSessionCookie } = await readSecrets();

  const submissionsMap = new Map<string, TransformedSubmission>();

  const priorSubmissionsMap: Map<string, TransformedSubmission> =
    await fsPromises.readFile(METADATA_FILE, { encoding: "utf8" }).then(
      (data) => {
        const map = new Map<string, TransformedSubmission>();
        for (const [line] of data.matchAll(/[^\n]+/g)) {
          const submission = JSON.parse(line) as TransformedSubmission;
          map.set(submission.id, submission);
        }
        return map;
      },
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
  let latestPriorSubmissionTimestamp = Math.max(
    ...Array.from(priorSubmissionsMap.values()).map((s) => s.timestamp),
  );

  const writeSubmissionsMetadataAndHashes = async () => {
    // Don't do anything if we didn't get data on any submissions.
    if (submissionsMap.size === 0) {
      return;
    }

    // If we haven't caught up to where the prior submissions left off, don't
    // overwrite them. This might result in repeated work but we won't lose
    // data or create gaps in submissions ranges.
    if (priorSubmissionsMap.size > 0) {
      return;
    }

    const submissions = [...submissionsMap.values()].sort(
      (a, b) => a.timestamp - b.timestamp,
    );

    await Promise.all([
      fsPromises.writeFile(
        METADATA_FILE,
        submissions
          .map((submission) => JSON.stringify(submission) + "\n")
          .join(""),
      ),

      fsPromises.writeFile(
        HASHES_FILE,
        submissions
          .map(
            (submission) =>
              // Two spaces intentional, see `shasum` manual.
              `${submission.sha512}  ${getDirnameForSubmission(
                submission,
              )}/${getFilenameForSubmission(submission)}\n`,
          )
          .join(""),
      ),
    ]);
  };

  try {
    while (true) {
      let data;
      try {
        console.error("Fetching...");
        // eslint-disable-next-line no-await-in-loop
        data = await getSubmissionList({
          session: leetcodeSessionCookie,
          // TODO: Don't hardcode the 20, export the constant from the API library.
          page: Math.floor(submissionsMap.size / 20),
        });
      } catch (e) {
        // eslint-disable-next-line no-await-in-loop
        await writeSubmissionsMetadataAndHashes();
        console.error("Sleeping because of an error:", e);
        // eslint-disable-next-line no-await-in-loop
        await sleep(60000);
        continue;
      }

      for (const { code, submission } of data.submissions_dump.map(
        transformSubmission,
      )) {
        submissionsMap.set(submission.id, submission);

        if (submission.timestamp < latestPriorSubmissionTimestamp) {
          console.error("Merging with prior submissions!");
          for (const priorSubmission of priorSubmissionsMap.values()) {
            if (!submissionsMap.has(priorSubmission.id)) {
              submissionsMap.set(priorSubmission.id, priorSubmission);
            }
          }

          latestPriorSubmissionTimestamp = -Infinity;
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
        await writeSubmissionsMetadataAndHashes();
      }

      console.error("Sleeping...");
      // eslint-disable-next-line no-await-in-loop
      await sleep(3000);
    }
  } finally {
    await writeSubmissionsMetadataAndHashes();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
