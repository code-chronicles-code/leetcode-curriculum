import { assertIsObject } from "@code-chronicles/util/assertIsObject";
import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";

export async function readWorkspaces(): Promise<string[]> {
  const yarnCommandResult = await execWithArgsOrThrowOnNzec(
    "yarn",
    ["--silent", "workspaces", "info"],
    {
      // Without a shell specified, `yarn` can fail to spawn in Windows
      // GitHub Actions for some reason. Maybe a PATH issue?
      shell: "bash",
    },
  );

  return Object.keys(
    assertIsObject(JSON.parse(yarnCommandResult.stdout)),
  ).sort();
}
