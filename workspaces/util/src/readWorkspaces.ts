import { z } from "zod";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { getLines } from "@code-chronicles/util/getLines";
import { execWithArgsOrThrowOnNzec } from "@code-chronicles/util/execWithArgsOrThrowOnNzec";

const workspaceZodType = z.union([
  z.object({
    location: z.string(),
    name: z.string(),
  }),
  z.object({
    location: z.literal("."),
    name: z.null(),
  }),
]);

export type Workspace = z.infer<typeof workspaceZodType>;

// TODO: rename to `readYarnWorkspaces`
export async function readWorkspaces(): Promise<Workspace[]> {
  const yarnCommandResult = await execWithArgsOrThrowOnNzec("yarn", [
    "workspaces",
    "list",
    "--json",
  ]);

  return [...getLines(yarnCommandResult.stdout)]
    .map((line) => workspaceZodType.parse(JSON.parse(line)))
    .sort((a, b) => compareStringsCaseInsensitive(a.name ?? "", b.name ?? ""));
}
