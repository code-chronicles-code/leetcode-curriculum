import { assertIsObject } from "@code-chronicles/util/assertIsObject";
import { assertIsString } from "@code-chronicles/util/assertIsString";
import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { getLines } from "@code-chronicles/util/getLines";
import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";

export async function readWorkspaces(): Promise<string[]> {
  const yarnCommandResult = await execWithArgsOrThrowOnNzec("yarn", [
    "workspaces",
    "list",
    "--json",
  ]);

  console.log(yarnCommandResult);

  return [...getLines(yarnCommandResult.stdout)]
    .map((line) => assertIsObject(JSON.parse(line)))
    .filter((workspace) => workspace.location !== ".")
    .map(({ name }) => assertIsString(name))
    .sort(compareStringsCaseInsensitive);
}
