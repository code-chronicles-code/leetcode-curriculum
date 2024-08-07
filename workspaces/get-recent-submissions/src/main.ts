import process from "node:process";

import { fetchRecentAcSubmissionList } from "@code-chronicles/leetcode-api";

async function main(): Promise<void> {
  const recentAcSubmissionList = await fetchRecentAcSubmissionList({
    username: "VehicleOfPuzzle",
  });

  for (const submission of recentAcSubmissionList) {
    console.log(submission);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
