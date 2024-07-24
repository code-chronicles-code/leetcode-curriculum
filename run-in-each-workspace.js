const { spawn } = require("node:child_process");
const fsPromises = require("node:fs/promises");
const process = require("node:process");

const COMMANDS = new Set(["format", "lint", "test", "typecheck"]);

const SKIP = {
  "download-submissions": new Set(["test"]),
  "eslint-config": new Set(["test", "typecheck"]),
  "fetch-leetcode-problem-list": new Set(["test"]),
  "get-recent-submissions": new Set(["test"]),
  "leetcode-api": new Set(["test"]),
  "post-potd": new Set(["test"]),
  util: new Set(["test"]),
};

// TODO: reusable utility!
function runOrThrow(command, args, options = {}) {
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

async function main() {
  if (process.argv.length < 3) {
    throw new Error(
      "Please specify the command to run in each workspace, one of: " +
        Array.from(COMMANDS).join(", "),
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

  const workspaceDirectories = JSON.parse(
    await fsPromises.readFile("package.json", "utf8"),
  ).workspaces;

  for (const workspaceDirectory of workspaceDirectories) {
    const workspaceName = workspaceDirectory.replace(/^workspaces\//, "");
    if (SKIP[workspaceName]?.has(command)) {
      console.error(
        `Skipping command ${command} for workspace ${workspaceName}`,
      );
      continue;
    }

    // eslint-disable-next-line  no-await-in-loop
    await runOrThrow("yarn", [command], {
      cwd: workspaceDirectory,
      shell: "bash",
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

// TODO: get format and lint to run on this file, as well
