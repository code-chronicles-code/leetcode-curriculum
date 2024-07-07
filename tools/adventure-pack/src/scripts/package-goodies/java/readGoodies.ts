import invariant from "invariant";
import fsPromises from "node:fs/promises";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";

export async function readGoodies(): Promise<Record<string, JavaGoody>> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, JavaGoody> = {};
  const goodiesByPackageName: Record<string, JavaGoody> = {};
  const registerGoody = (goody: JavaGoody): void => {
    invariant(
      goodiesByName[goody.name] == null,
      `Goody ${goody.name} already exists!`,
    );
    invariant(
      goodiesByPackageName[goody.packageName] == null,
      `Goody with package name ${goody.packageName} already exists!`,
    );

    goodiesByName[goody.name] = goody;
    goodiesByPackageName[goody.packageName] = goody;
  };

  for (const entry of fileEntries) {
    const packageName = entry.name;
    invariant(
      entry.isDirectory(),
      `Found non-package ${JSON.stringify(packageName)} in Java goodies directory!`,
    );

    // eslint-disable-next-line no-await-in-loop
    const goody = await readBasicGoody(packageName);

    const expectedPackageName = goody.name
      .replace(/[A-Z]+/g, ([upper]) => "_" + upper.toLowerCase())
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/_$/, "")
      .replace(/^_/, "");
    invariant(
      packageName === expectedPackageName,
      `Mismatched package name for goody! Expected ${JSON.stringify(expectedPackageName)} based on goody name ${JSON.stringify(goody.name)} but got ${JSON.stringify(packageName)}.`,
    );

    registerGoody(goody);
  }

  for (const goody of Object.values(goodiesByName)) {
    goody.imports = goody.imports.map((im) => {
      const importedGoody = goodiesByPackageName[im];
      invariant(
        importedGoody != null,
        `Unknown import ${JSON.stringify(im)} in ${goody.name}`,
      );
      return importedGoody.name;
    });
  }

  for (const goody of Object.values(goodiesByName)) {
    for (const im of goody.imports) {
      goodiesByName[im].importedBy.push(goody.name);
    }
  }

  for (const goody of Object.values(goodiesByName)) {
    goody.importedBy.sort();
    goody.imports.sort();
  }

  return goodiesByName;
}
