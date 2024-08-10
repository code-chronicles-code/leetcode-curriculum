import process from "node:process";

import {
  fetchRecentAcSubmissionList,
  type RecentAcSubmission,
} from "@code-chronicles/leetcode-api";
import { promiseAllLimitingConcurrency } from "@code-chronicles/util/promiseAllLimitingConcurrency";

async function main(): Promise<void> {
  if (process.argv.length <= 2) {
    throw new Error(
      "Please specify one or more LeetCode usernames of interest.",
    );
  }

  // TODO: distinct utility
  const usernames = [...new Set(process.argv.slice(2))];

  // TODO: some parts of the Hack library could be nice here
  const results: Record<string, RecentAcSubmission[]> = {};
  await promiseAllLimitingConcurrency(
    usernames.map((username) => async () => {
      // TODO: maybe tolerate some usernames failing
      results[username] = await fetchRecentAcSubmissionList({
        username,
      });
    }),

    // TODO: figure out the right amount of concurrency or throttling
    1,
  );

  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
