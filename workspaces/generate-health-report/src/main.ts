import type { Context } from "@actions/github/lib/context.d.ts";
import type { Octokit } from "@octokit/rest";
import { writeFile } from "node:fs/promises";
import nullthrows from "nullthrows";

import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

const COMMANDS = [
  "yarn lint",
  "yarn typecheck",
  "yarn test",
  "yarn workspace @code-chronicles/adventure-pack build-app",
  "yarn workspace @code-chronicles/fetch-leetcode-problem-list build",
];

export default async function ({
  context,
  os,
}: {
  context: Context;
  github: Octokit;
  os: string;
}): Promise<void> {
  const pullRequest = nullthrows(context.payload.pull_request);
  const healthReportPrefix = `<!-- HEALTH REPORT: ${os} -->`;

  const lines = [];
  let hasError = false;
  for (const command of COMMANDS) {
    // eslint-disable-next-line no-await-in-loop
    await spawnWithSafeStdio("git", ["reset", "--hard", "HEAD"]);
    // eslint-disable-next-line no-await-in-loop
    await spawnWithSafeStdio("git", ["clean", "-fd"]);

    console.error("Running: " + command);
    try {
      // eslint-disable-next-line no-await-in-loop
      await spawnWithSafeStdio("bash", ["-c", command + " 1>&2"]);
      lines.push(` * \`${command}\`: ✅`);
    } catch (err) {
      console.error(err);
      lines.push(` * \`${command}\`: ❌`);
      hasError = true;
    }
  }

  const lastCheckedCommit = pullRequest.head.sha;
  const healthReportBody =
    `${healthReportPrefix}\n\n# PR Health Report (${os})\n\nLast checked commit ${lastCheckedCommit}.\n\n` +
    lines.map((line) => line + "\n").join("");

  await writeFile(
    nullthrows(process.env.GITHUB_STEP_SUMMARY),
    healthReportBody,
  );

  if (hasError) {
    throw new Error();
  }
}
