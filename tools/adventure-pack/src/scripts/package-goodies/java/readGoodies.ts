import invariant from "invariant";
import fsPromises from "node:fs/promises";

import { setIfNotHasOwnOrThrow } from "@code-chronicles/util";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { GOODIES_DIRECTORY } from "./constants";
import { type JavaGoodyBase, readBaseGoody } from "./readBaseGoody";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports";

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

    const expectedPackageName = baseGoody.name
      .replace(/[A-Z]+/g, ([upper]) => "_" + upper.toLowerCase())
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/_$/, "")
      .replace(/^_/, "");
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
        `Unknown import ${JSON.stringify(im)} in ${importedBaseGoody.name}`,
      );
      return importedBaseGoody.name;
    });
  }

  // TODO: assert that the AP class is the only one that exists in multiple goodies

  return fillOutImportedByAndSortImports(baseGoodiesByName);
}
