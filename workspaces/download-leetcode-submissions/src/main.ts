import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import {
  fetchSubmissionList,
  SUBMISSIONS_LIST_DEFAULT_PAGE_SIZE,
} from "@code-chronicles/leetcode-api";
import { promiseAllLimitingConcurrency } from "@code-chronicles/util/promiseAllLimitingConcurrency";
import { sleep } from "@code-chronicles/util/sleep";
import { whileReturnsTrueAsync } from "@code-chronicles/util/whileReturnsTrueAsync";

import { CONCURRENCY_LIMIT } from "./constants";
import { getFilenameForSubmission } from "./getFilenameForSubmission";
import { getDirnameForSubmission } from "./getDirnameForSubmission";
import { readPriorSubmissions } from "./readPriorSubmissions";
import { readSecrets } from "./readSecrets";
import {
  transformSubmission,
  type TransformedSubmission,
} from "./transformSubmission";
import { writeSubmissionsMetadataAndHashes } from "./writeSubmissionsMetadataAndHashes";

async function main(): Promise<void> {
  // TODO: maybe create the file from a template if it doesn't exist
  const { leetcodeSessionCookie } = await readSecrets();

  const submissionsMap = new Map<string, TransformedSubmission>();

  const priorSubmissionsMap = await readPriorSubmissions();
  console.error(
    `Prior data available on ${[priorSubmissionsMap.size]} submissions so far.`,
  );
  let latestPriorSubmissionTimestamp = Math.max(
    ...Array.from(priorSubmissionsMap.values()).map((s) => s.timestamp),
  );

  const maybeWriteSubmissionsMetadataAndHashes = async () => {
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

    await writeSubmissionsMetadataAndHashes(submissionsMap);
  };

  try {
    await whileReturnsTrueAsync(async () => {
      let data;
      try {
        console.error("Fetching...");
        data = await fetchSubmissionList({
          session: leetcodeSessionCookie,
          page: Math.floor(
            submissionsMap.size / SUBMISSIONS_LIST_DEFAULT_PAGE_SIZE,
          ),
        });
      } catch (e) {
        await maybeWriteSubmissionsMetadataAndHashes();

        console.error("Sleeping because of an error:", e);
        await sleep(60000);
        return true;
      }

      const writes = [];
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

        writes.push(async () => {
          console.error(`Saving submission ${submission.id} to a file.`);

          const dir = getDirnameForSubmission(submission);
          await mkdir(dir, { recursive: true });

          const filename = getFilenameForSubmission(submission);
          await writeFile(path.join(dir, filename), code, { encoding: "utf8" });
        });
      }

      await promiseAllLimitingConcurrency(writes, CONCURRENCY_LIMIT);

      console.error(
        `Downloaded data on ${[submissionsMap.size]} submissions so far.`,
      );

      if (!data.has_next) {
        return false;
      }

      // TODO: make a constant
      if (Math.random() < 0.1) {
        await maybeWriteSubmissionsMetadataAndHashes();
      }

      console.error("Sleeping...");
      await sleep(3000);
      return true;
    });
  } finally {
    await maybeWriteSubmissionsMetadataAndHashes();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
