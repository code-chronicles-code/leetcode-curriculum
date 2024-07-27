import process from "node:process";
import type { IterableElement } from "type-fest";

import { getCurrentGitRepositoryRoot } from "@code-chronicles/util/getCurrentGitRepositoryRoot";
import { readWorkspaces } from "@code-chronicles/util/readWorkspaces";
import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

// TODO: figure out a way to mark read-only
const COMMANDS = new Set(["format", "lint", "test", "typecheck"] as const);

type Command = IterableElement<typeof COMMANDS>;

function isCommand(value: string): value is Command {
  return COMMANDS.has(value as Command);
}

// TODO: this should probably be some kind of config outside this workspace
const SKIP: Readonly<Record<string, ReadonlySet<Command>>> = {
  "download-submissions": new Set(["test"]),
  "eslint-config": new Set(["test", "typecheck"]),
  "fetch-leetcode-problem-list": new Set(["test"]),
  "generate-health-report": new Set(["test"]),
  "get-recent-submissions": new Set(["test"]),
  "leetcode-api": new Set(["test"]),
  "post-potd": new Set(["test"]),
  "run-in-each-workspace": new Set(["test"]),
  util: new Set(["test"]),
};

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
  if (!isCommand(command)) {
    throw new Error(`Invalid command: ${command}`);
  }

  process.chdir(await getCurrentGitRepositoryRoot());

  const workspaceDirectories = await readWorkspaces("package.json");

  let hasError = false;
  for (const workspaceDirectory of workspaceDirectories) {
    const workspaceName = stripPrefixOrThrow(workspaceDirectory, "workspaces/");
    if (SKIP[workspaceName]?.has(command)) {
      console.error(
        `Skipping command ${command} for workspace ${workspaceName}`,
      );
      continue;
    }

    try {
      // eslint-disable-next-line no-await-in-loop
      await spawnWithSafeStdio("yarn", [command], {
        cwd: workspaceDirectory,
        shell: "bash",
        env: { ...process.env, FORCE_COLOR: "1" },
      });
    } catch (err) {
      hasError = true;
      console.error(err);
    }
  }

  if (hasError) {
    throw new Error("Some sub-commands did not complete successfully.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
