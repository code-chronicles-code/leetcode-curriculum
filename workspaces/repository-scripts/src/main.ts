import type { SpawnOptions } from "node:child_process";
import process from "node:process";

import { getCurrentGitRepositoryRoot } from "@code-chronicles/util/getCurrentGitRepositoryRoot";
import { readWorkspaces } from "@code-chronicles/util/readWorkspaces";
import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import {
  SCRIPTS,
  isScript,
  REPOSITORY_ROOT_COMMANDS,
  SCRIPTS_TO_SKIP_BY_WORKSPACE,
} from "./scripts";

async function main() {
  if (process.argv.length < 3) {
    throw new Error(
      "Please specify the script to run, one of: " +
        Array.from(SCRIPTS).join(", "),
    );
  }

  const [script, ...scriptArgs] = process.argv.slice(2);
  if (!isScript(script)) {
    throw new Error(`Invalid script: ${script}`);
  }

  const errors: { command: string; args: readonly string[] }[] = [];
  const run = async (
    command: string,
    args: readonly string[],
    options?: Omit<SpawnOptions, "env" | "shell" | "stdio">,
  ): Promise<void> => {
    const combinedArgs = [...args, ...scriptArgs];
    try {
      await spawnWithSafeStdio(command, combinedArgs, {
        ...options,
        env: { ...process.env, FORCE_COLOR: "1" },
        // Without a shell specified, `yarn` can fail to spawn in Windows
        // GitHub Actions for some reason. Maybe a PATH issue?
        shell: "bash",
      });
    } catch (err) {
      errors.push({ command, args: combinedArgs });
      console.error(err);
    }
  };

  const rootCommand = REPOSITORY_ROOT_COMMANDS[script];
  if (rootCommand) {
    const currentGitRepositoryRoot = await getCurrentGitRepositoryRoot();

    console.error(`Running script ${script} for repository root!`);
    await run.apply(null, [...rootCommand, { cwd: currentGitRepositoryRoot }]);
  }

  const workspaces = await readWorkspaces();
  for (const workspace of workspaces) {
    const workspaceShortName = stripPrefixOrThrow(
      workspace,
      "@code-chronicles/",
    );
    if (SCRIPTS_TO_SKIP_BY_WORKSPACE[workspaceShortName]?.has(script)) {
      console.error(
        `Skipping script ${script} for workspace: ${workspaceShortName}`,
      );
      continue;
    }

    console.error(
      `Running script ${script} for workspace: ${workspaceShortName}`,
    );
    // eslint-disable-next-line no-await-in-loop
    await run("yarn", ["workspace", workspace, script]);
  }

  if (errors.length > 0) {
    console.error("Some commands did not complete successfully:");
    for (const error of errors) {
      console.error(error);
    }
    throw new Error();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
