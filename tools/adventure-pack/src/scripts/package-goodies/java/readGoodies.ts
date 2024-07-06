import invariant from "invariant";
import fsPromises from "node:fs/promises";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";

const EXCLUDED_DIRECTORIES = new Set([".gradle", "gradle", "build"]);

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
    if (!entry.isDirectory() || EXCLUDED_DIRECTORIES.has(entry.name)) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const goody = await readBasicGoody(entry.name);
    invariant(goody.name === entry.name, "Mismatched goody name!");
    registerGoody(goody);
  }

  return goodiesByName;
}
