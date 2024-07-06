import invariant from "invariant";
import fsPromises from "node:fs/promises";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";

export async function readGoodies(): Promise<Record<string, JavaGoody>> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, JavaGoody> = {};
  const registerGoody = (goody: JavaGoody): void => {
    invariant(
      goodiesByName[goody.name] == null,
      `Goody ${goody.name} already exists!`,
    );
    goodiesByName[goody.name] = goody;
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

  return goodiesByName;
}
