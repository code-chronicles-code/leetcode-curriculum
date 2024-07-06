import invariant from "invariant";
import fsPromises from "node:fs/promises";

import type { Python3Goody } from "../../../app/parsers/python3GoodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";

export async function readGoodies(): Promise<Record<string, Python3Goody>> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, Python3Goody> = {};
  const registerGoody = (goody: Python3Goody): void => {
    invariant(
      goodiesByName[goody.name] == null,
      `Goody ${goody.name} already exists!`,
    );
    goodiesByName[goody.name] = goody;
  };

  for (const entry of fileEntries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const goody = await readBasicGoody(entry.name);
    invariant(goody.name === entry.name, "Mismatched goody name!");
    registerGoody(goody);
  }

  return goodiesByName;
}
