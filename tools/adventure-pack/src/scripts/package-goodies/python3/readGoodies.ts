import { setIfNotHasOwnOrThrow } from "@code-chronicles/util";
import invariant from "invariant";
import fsPromises from "node:fs/promises";

import type { Python3Goody } from "../../../app/parsers/python3GoodyParser";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports";
import {
  type Python3GoodyBase,
  readBaseGoody,
  GOODIES_DIRECTORY,
} from "./readBaseGoody";

export async function readGoodies(): Promise<Record<string, Python3Goody>> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const baseGoodiesByName: Record<string, Python3GoodyBase> = {};

  for (const entry of fileEntries) {
    const moduleName = entry.name;
    invariant(
      entry.isDirectory(),
      `Found non-module ${JSON.stringify(moduleName)} in Python 3 goodies directory!`,
    );

    // eslint-disable-next-line no-await-in-loop
    const baseGoody = await readBaseGoody(moduleName);
    invariant(baseGoody.name === entry.name, "Mismatched goody name!");
    setIfNotHasOwnOrThrow(baseGoodiesByName, baseGoody.name, baseGoody);
  }

  return fillOutImportedByAndSortImports(baseGoodiesByName);
}
