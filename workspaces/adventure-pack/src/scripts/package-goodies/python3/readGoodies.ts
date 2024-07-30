import fsPromises from "node:fs/promises";

import invariant from "invariant";

import { setIfNotHasOwnOrThrow } from "@code-chronicles/util/setIfNotHasOwnOrThrow";

import type { Python3Goody } from "../../../app/parsers/python3GoodyParser";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports";
import { GOODIES_DIRECTORY } from "./constants";
import { type Python3GoodyBase, readBaseGoody } from "./readBaseGoody";
import { normalizeGoodyNameToPackageOrModuleName } from "../normalizeGoodyNameToPackageOrModuleName";

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

    const expectedModuleName = normalizeGoodyNameToPackageOrModuleName(
      baseGoody.name,
    );
    invariant(
      moduleName === expectedModuleName,
      `Mismatched module name for goody! Expected ${JSON.stringify(expectedModuleName)} based on goody name ${JSON.stringify(baseGoody.name)} but got ${JSON.stringify(moduleName)}.`,
    );

    setIfNotHasOwnOrThrow(baseGoodiesByName, baseGoody.name, baseGoody);
  }

  return fillOutImportedByAndSortImports(baseGoodiesByName);
}
