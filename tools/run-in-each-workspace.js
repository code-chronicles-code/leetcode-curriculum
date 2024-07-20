const { spawnSync } = require("node:child_process");
const fsPromises = require("node:fs/promises");
const process = require("node:process");

const COMMANDS = new Set(["format", "lint", "test", "typecheck"]);

const SKIP = {
  "download-submissions": new Set(["test"]),
  "eslint-config": new Set(["test", "typecheck"]),
  "get-leetcode-problem-list": new Set(["test"]),
  "get-recent-submissions": new Set(["test"]),
  "leetcode-api": new Set(["test"]),
  "post-potd": new Set(["test"]),
  util: new Set(["test"]),
};

async function main() {
  if (process.argv.length < 3) {
    throw new Error(
      "Please specify the command to run in each workspace, one of: " +
        Array.from(COMMANDS).join(", ")
    );
  }

  if (process.argv.length > 3) {
    throw new Error("Too many command-line arguments!");
  }

  const command = process.argv[2];
  if (!COMMANDS.has(command)) {
    throw new Error(`Invalid command: ${command}`);
  }

  process.chdir(__dirname);

  const { workspaces } = JSON.parse(
    await fsPromises.readFile("package.json", "utf8")
  );

  for (const workspace of workspaces) {
    if (SKIP[workspace]?.has(command)) {
      console.error(`Skipping command ${command} for workspace ${workspace}`);
      continue;
    }

    const { error, status } = spawnSync("yarn", [command], {
      cwd: workspace,
      shell: "bash",
      stdio: ["ignore", "inherit", "inherit"],
    });
    if (error) {
      throw error;
    }
    if (status) {
      throw new Error(`Non-zero exit code ${status}.`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

// TODO: get format and lint to run on this file, as well
