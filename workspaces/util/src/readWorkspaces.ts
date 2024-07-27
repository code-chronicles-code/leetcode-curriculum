import fsPromises from "node:fs/promises";

import { assertIsArray } from "@code-chronicles/util/assertIsArray";
import { assertIsObject } from "@code-chronicles/util/assertIsObject";
import { assertIsString } from "@code-chronicles/util/assertIsString";

export async function readWorkspaces(path: string): Promise<string[]> {
  const packageJson = assertIsObject(
    JSON.parse(await fsPromises.readFile(path, "utf8")),
  );
  const workspaces = assertIsObject(packageJson.workspaces);
  const packages = assertIsArray(workspaces.packages);
  return packages.map(assertIsString);
}

// TODO: use output of `yarn workspaces` instead
