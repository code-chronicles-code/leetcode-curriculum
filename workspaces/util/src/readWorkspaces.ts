import { assertIsObject } from "@code-chronicles/util/assertIsObject";
import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";

export async function readWorkspaces(): Promise<string[]> {
  const yarnCommandResult = await execWithArgsOrThrowOnNzec("yarn", [
    "--silent",
    "workspaces",
    "info",
  ]);

  return Object.keys(
    assertIsObject(JSON.parse(yarnCommandResult.stdout)),
  ).sort();
}
