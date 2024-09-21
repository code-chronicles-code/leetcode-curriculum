import fsPromises from "node:fs/promises";

import invariant from "invariant";

import { setIfNotHasOwnOrThrow } from "@code-chronicles/util/setIfNotHasOwnOrThrow";

import type { JavaGoody } from "../../../app/zod-types/javaGoodyZodType.ts";
import { GOODIES_DIRECTORY } from "./constants.ts";
import { type JavaGoodyBase, readBaseGoody } from "./readBaseGoody.ts";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports.ts";
import { normalizeGoodyNameToPackageOrModuleName } from "../normalizeGoodyNameToPackageOrModuleName.ts";

export async function readGoodies(): Promise<Record<string, JavaGoody>> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const baseGoodiesByName: Record<string, JavaGoodyBase> = {};
  const baseGoodiesByPackageName: Record<string, JavaGoodyBase> = {};

  for (const entry of fileEntries) {
    const packageName = entry.name;
    invariant(
      entry.isDirectory(),
      `Found non-package ${JSON.stringify(packageName)} in Java goodies directory!`,
    );

    // eslint-disable-next-line no-await-in-loop
    const baseGoody = await readBaseGoody(packageName);

    const expectedPackageName = normalizeGoodyNameToPackageOrModuleName(
      baseGoody.name,
    );
    invariant(
      packageName === expectedPackageName,
      `Mismatched package name for goody! Expected ${JSON.stringify(expectedPackageName)} based on goody name ${JSON.stringify(baseGoody.name)} but got ${JSON.stringify(packageName)}.`,
    );

    setIfNotHasOwnOrThrow(baseGoodiesByName, baseGoody.name, baseGoody);
    setIfNotHasOwnOrThrow(
      baseGoodiesByPackageName,
      baseGoody.packageName,
      baseGoody,
    );
  }

  for (const baseGoody of Object.values(baseGoodiesByName)) {
    baseGoody.imports = baseGoody.imports.map((im) => {
      const importedBaseGoody = baseGoodiesByPackageName[im];
      invariant(
        importedBaseGoody != null,
        `Unknown import ${JSON.stringify(im)} in goody ${JSON.stringify(baseGoody.name)}.`,
      );
      return importedBaseGoody.name;
    });
  }

  // TODO: assert that the AP class is the only one that exists in multiple goodies

  return fillOutImportedByAndSortImports(baseGoodiesByName);
}
