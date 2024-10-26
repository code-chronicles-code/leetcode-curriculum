import process from "node:process";

import { COLOR_LEVEL } from "./chalkLevelOrForced.ts";
import { reportCommandAndSpawn } from "./reportCommandAndSpawn.ts";

async function main(): Promise<void> {
  const projectCwd = process.env.PROJECT_CWD;
  if (!projectCwd) {
    throw new Error(
      "No PROJECT_CWD environment variable. Please make sure you're running the script through a Yarn `package.json` script.",
    );
  }

  // We strip out the `npm_lifecycle_event` environment variable so that
  // we'll recursively run the script on the root workspace again:
  const { npm_lifecycle_event: npmLifecycleEvent, ...filteredEnv } =
    process.env;
  if (!npmLifecycleEvent) {
    throw new Error(
      "No npm_lifecycle_event environment variable. Please make sure you're running the script through a Yarn `package.json` script.",
    );
  }

  if (process.argv.length > 2) {
    console.warn(
      "The lint script doesn't accept any command-line arguments, it lints the entire workspace it's run in.",
    );
  }

  const env = { ...filteredEnv, FORCE_COLOR: `${COLOR_LEVEL}` };

  if (
    process.cwd() === projectCwd &&
    process.env.CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH !== "1"
  ) {
    await reportCommandAndSpawn(
      "yarn",
      ["workspaces", "foreach", "-pAvv", "run", npmLifecycleEvent],
      {
        stdio: "inherit",
        env: {
          ...env,

          // Although we've patched Yarn to add this environment variable when
          // running as `yarn workspaces foreach`, no harm in setting it here
          // as well just in case.
          CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH: "1",
        },
      },
    );
    return;
  }

  await reportCommandAndSpawn("eslint", ["--color", "--max-warnings=0", "."], {
    stdio: "inherit",
    env,
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
