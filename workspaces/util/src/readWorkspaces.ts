import { assertIsObject } from "@code-chronicles/util/assertIsObject";
import { execWithArgs } from "@code-chronicles/util/execWithArgs";

export async function readWorkspaces(): Promise<string[]> {
  const yarnCommandResult = await execWithArgs(
    "yarn",
    ["--silent", "workspaces", "info"],
    {
      // Without a shell specified, the command fails to spawn in Windows
      // GitHub Actions for some reason.
      shell: "bash",
    },
  );

  if (yarnCommandResult.exitCode !== 0) {
    throw new Error(yarnCommandResult.stderr.trim() || "Non-zero exit code!");
  }

  return Object.keys(
    assertIsObject(JSON.parse(yarnCommandResult.stdout)),
  ).sort();
}
