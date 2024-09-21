import fsPromises from "node:fs/promises";
import path from "node:path";

import { only } from "@code-chronicles/util/only";

import { GOODIES_DIRECTORY } from "./constants.ts";

export async function readCode(packageName: string): Promise<string> {
  const fileEntries = await fsPromises.readdir(
    path.join(GOODIES_DIRECTORY, packageName),
    { withFileTypes: true },
  );

  const mainFileName = only(
    fileEntries.filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".java") &&
        entry.name !== "Test.java",
    ),
  ).name;

  return await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, mainFileName),
    "utf8",
  );
}
