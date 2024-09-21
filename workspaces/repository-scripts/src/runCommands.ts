import type { SpawnOptions } from "node:child_process";
import process from "node:process";

import { getCurrentGitRepositoryRoot } from "@code-chronicles/util/getCurrentGitRepositoryRoot";
import { maybeThrow } from "@code-chronicles/util/maybeThrow";
import { promiseAllLimitingConcurrency } from "@code-chronicles/util/promiseAllLimitingConcurrency";
import { readWorkspaces } from "@code-chronicles/util/readWorkspaces";
import { runWithLogGroupAsync } from "@code-chronicles/util/runWithLogGroupAsync";
import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import {
  SCRIPTS,
  SCRIPTS_TO_SKIP_BY_WORKSPACE,
  type Script,
} from "./scripts.ts";

type FailedCommand = {
  command: string;
  args: readonly string[];
  error: unknown;
};

export async function runCommands(
  script: Script,
  scriptArgs: readonly string[],
): Promise<void> {
  const failedCommands: FailedCommand[] = [];

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
      });
    } catch (error) {
      failedCommands.push({ command, args: combinedArgs, error });
      console.error(error);
    }
  };

  const commands = [
    async () => {
      const rootCommand = SCRIPTS[script]?.repositoryRootCommand;
      if (rootCommand != null) {
        const currentGitRepositoryRoot = await getCurrentGitRepositoryRoot();

        await runWithLogGroupAsync(
          `Running script ${script} for repository root!`,
          async () =>
            await run.apply(null, [
              ...rootCommand,
              { cwd: currentGitRepositoryRoot },
            ]),
        );
      }
    },

    ...(await readWorkspaces()).map((workspace) => async () => {
      const workspaceShortName = stripPrefixOrThrow(
        workspace,
        "@code-chronicles/",
      );
      if (SCRIPTS_TO_SKIP_BY_WORKSPACE[workspaceShortName]?.has(script)) {
        console.error(
          `Skipping script ${script} for workspace: ${workspaceShortName}`,
        );
        return;
      }

      await runWithLogGroupAsync(
        `Running script ${script} for workspace: ${workspaceShortName}`,
        async () => await run("yarn", ["workspace", workspace, script]),
      );
    }),
  ];

  await promiseAllLimitingConcurrency(
    commands,
    // TODO: support parallelization in GitHub Actions
    1,
  );

  if (failedCommands.length > 0) {
    console.error("Some commands did not complete successfully:");
    for (const { command, args } of failedCommands) {
      console.error({ command, args });
    }

    maybeThrow(failedCommands.map(({ error }) => error));
  }
}
