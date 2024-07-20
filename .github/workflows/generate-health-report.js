const { spawn } = require("node:child_process");

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

// TODO: reusable utility!
async function runOrThrow(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      ...options,
      stdio: ["ignore", "pipe", "pipe"],
    });

    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on("error", reject);
    childProcess.on("exit", (exitCode) => {
      if (exitCode) {
        reject(new Error(`Non-zero exit code ${exitCode}.`));
      } else {
        resolve();
      }
    });
  });
}

module.exports = async ({ context, github, os }) => {
  const prNumber = context.payload.pull_request.number;
  const healthReportPrefix = `<!-- HEALTH REPORT: ${os} -->`;

  const lines = [];
  for (const command of COMMANDS) {
    await runOrThrow("git", ["reset", "--hard", "HEAD"]);
    await runOrThrow("git", ["clean", "-fd"]);

    console.error("Running: " + command);
    try {
      await runOrThrow("bash", ["-c", command + " 1>&2"]);
      lines.push(` * \`${command}\`: ✅`);
    } catch (err) {
      lines.push(` * \`${command}\`: ❌`);
    }
  }

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
