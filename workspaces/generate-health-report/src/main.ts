import type { Context } from "@actions/github/lib/context.d.ts";
import type { Octokit } from "@octokit/rest";
import { writeFile } from "node:fs/promises";
import nullthrows from "nullthrows";

import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

const GITHUB_ACTIONS_BOT_ID = 41898282;

const COMMANDS = [
  "yarn lint",
  // "yarn typecheck",
  // "yarn test",
  // "yarn workspace @code-chronicles/adventure-pack build-app",
  // "yarn workspace @code-chronicles/fetch-leetcode-problem-list build",
];

export default async function ({
  context,
  github,
  os,
}: {
  context: Context;
  github: Octokit;
  os: string;
}): Promise<void> {
  const pullRequest = nullthrows(context.payload.pull_request);
  const prNumber = pullRequest.number;
  const healthReportPrefix = `<!-- HEALTH REPORT: ${os} -->`;

  const lines = [];
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
    }
  }

  const existingHealthReport = await github.rest.issues
    .listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      // eslint-disable-next-line camelcase -- This casing is required by the API.
      issue_number: prNumber,
    })
    .then(({ data }) =>
      data.find(
        (c) =>
          nullthrows(c?.user).id === GITHUB_ACTIONS_BOT_ID &&
          nullthrows(c?.body).startsWith(healthReportPrefix),
      ),
    );

  const lastCheckedCommit = pullRequest.head.sha;
  const healthReportBody =
    `${healthReportPrefix}\n\n# PR Health Report (${os})\n\nLast checked commit ${lastCheckedCommit}.\n\n` +
    lines.map((line) => line + "\n").join("");

  // if (existingHealthReport) {
  //   await github.rest.issues.updateComment({
  //     owner: context.repo.owner,
  //     repo: context.repo.repo,
  //     // eslint-disable-next-line camelcase -- This casing is required by the API.
  //     comment_id: existingHealthReport.id,
  //     body: healthReportBody,
  //   });
  // } else {
  //   console.log(context.repo)
  //   console.log(context)
  //   await github.rest.issues.createComment({
  //     owner: context.repo.owner,
  //     repo: context.repo.repo,
  //     // eslint-disable-next-line camelcase -- This casing is required by the API.
  //     issue_number: prNumber,
  //     body: healthReportBody,
  //   });
  // }
  await writeFile(
      nullthrows(process.env.GITHUB_STEP_SUMMARY),
      healthReportBody
  )
}
