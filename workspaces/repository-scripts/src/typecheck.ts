import process from "node:process";

import { Chalk } from "chalk";

import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

import { COLOR_LEVEL } from "./chalkLevelOrForced.ts";
import { reportCommand } from "./reportCommand.ts";
import { reportCommandAndSpawn } from "./reportCommandAndSpawn.ts";

async function main(): Promise<void> {
  const projectCwd = process.env.PROJECT_CWD;
  if (!projectCwd) {
    throw new Error(
      "No PROJECT_CWD environment variable. Please make sure you're running the script through a Yarn `package.json` script.",
    );
  }

  const { npm_lifecycle_event: npmLifecycleEvent } = process.env;
  if (!npmLifecycleEvent) {
    throw new Error(
      "No npm_lifecycle_event environment variable. Please make sure you're running the script through a Yarn `package.json` script.",
    );
  }

  if (process.argv.length > 2) {
    console.warn(
      "The typecheck script doesn't accept any command-line arguments, it typechecks the entire workspace it's run in.",
    );
  }

  const env = { ...process.env, FORCE_COLOR: `${COLOR_LEVEL}` };

  if (
    process.cwd() === projectCwd &&
    process.env.CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH !== "1"
  ) {
    const cmd = "yarn";
    const args = ["workspaces", "foreach", "-pAvv", "run", npmLifecycleEvent];
    reportCommand(cmd, args);

    // Desperately try to make `yarn typecheck` when run from the repository
    // root and `yarn workspaces foreach run typecheck` have the same output.
    // TODO: maybe don't create a new Chalk object but use one from somewhere else
    const prefix = new Chalk({ level: COLOR_LEVEL }).hex("#3D9970")(
      `[${process.env.npm_package_name || "root-workspace"}]`,
    );
    console.error(`${prefix} Skipping because there\'s no "typecheck" script`);

    await spawnWithSafeStdio(cmd, args, {
      stdio: "inherit",
      env: {
        ...env,

        // Although we've patched Yarn to add this environment variable when
        // running as `yarn workspaces foreach`, no harm in setting it here
        // as well just in case.
        CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH: "1",
      },
    });
    return;
  }

  if (process.cwd() === projectCwd) {
    // Desperately try to make `yarn typecheck` when run from the repository
    // root and `yarn workspaces foreach run typecheck` have the same output.
    console.error('Skipping because there\'s no "typecheck" script');
    return;
  }

  await reportCommandAndSpawn("tsc", ["--pretty", "--project", "."], {
    stdio: "inherit",
    env,
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
