const { exec: execWithCallback } = require("node:child_process");
const { promisify } = require("node:util");

const exec = promisify(execWithCallback);

const GITHUB_ACTIONS_BOT_ID = 41898282;

const COMMANDS = [
  "npx prettier --write .github .vscode && ! (git status --porcelain | grep .)",
  "(cd tools && yarn format && ! (git status --porcelain | grep .))",
  "(cd tools && yarn lint)",
  "(cd tools && yarn typecheck)",
  "(cd tools && yarn test)",
  "(cd tools/adventure-pack && yarn build-app)",
  "(cd tools/get-leetcode-problem-list && yarn build)",
];

module.exports = async ({ context, github, os }) => {
  const prNumber = context.payload.pull_request.number;
  const healthReportPrefix = `<!-- HEALTH REPORT: ${os} -->`;

  const existingHealthReport = await github.rest.issues
    .listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
    })
    .then(({ data }) =>
      data.find(
        (c) =>
          c.user.id === GITHUB_ACTIONS_BOT_ID &&
          c.body.startsWith(healthReportPrefix),
      ),
    );

  const lines = [];
  for (const command of COMMANDS) {
    await exec("git reset --hard HEAD");
    await exec("git clean -fd");

    console.error("Running: " + command);
    try {
      const { stderr } = await exec(command + " 1>&2", { shell: "bash" });
      console.error(stderr);
      lines.push(` * \`${command}\`: ✅`);
    } catch (err) {
      console.error(err.stderr);
      console.error(err);
      lines.push(` * \`${command}\`: ❌`);
    }
  }

  const healthReportBody =
    `${healthReportPrefix}\n\n# PR Health Report (${os})\n\nLast checked commit ${context.payload.pull_request.head.sha}.\n\n` +
    lines.map((line) => line + "\n").join("");

  if (existingHealthReport) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: existingHealthReport.id,
      body: healthReportBody,
    });
  } else {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
      body: healthReportBody,
    });
  }
};
