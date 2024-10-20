import process from "node:process";

import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

export async function run(): Promise<void> {
  try {
    const projectCwd = process.env.PROJECT_CWD;
    if (!projectCwd) {
      throw new Error(
        "No PROJECT_CWD environment variable. Please make sure you're running the script through Yarn.",
      );
    }

    if (process.argv.length > 1) {
      console.warn(
        "The typecheck script doesn't accept any command-line arguments, it typechecks the entire workspace it's run in.",
      );
    }

    if (
      process.cwd() === projectCwd &&
      process.env.CODE_CHRONICLES_RUNNING_VIA_YARN_WORKSPACES_FOREACH !== "1"
    ) {
      console.warn(
        "Looks like you're running typecheck in the root workspace, will typecheck the whole project!",
      );

      // Strip out the `npm_lifecycle_event` environment variable so that we'll recursively run the script on the root workspace again!
      const { npm_lifecycle_event: _, ...env } = process.env;

      await spawnWithSafeStdio(
        "yarn",
        ["workspaces", "foreach", "-pA", "run", "typecheck"],
        { stdio: "inherit", env },
      );
    } else {
      console.warn(
        "Looks like you're running typecheck for a specific project!",
      );

      await spawnWithSafeStdio("tsc", ["--pretty", "--project", "."], {
        stdio: "inherit",
      });
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}
