import fsPromises from "node:fs/promises";
import path from "node:path";
import { WritableDeep } from "type-fest";

import type { Python3Goody } from "../../../app/parsers/python3GoodyParser";

export const GOODIES_DIRECTORY = path.join("goodies", "python3", "src");

export type Python3GoodyBase = Omit<WritableDeep<Python3Goody>, "importedBy">;

export async function readBaseGoody(
  moduleName: string,
): Promise<Python3GoodyBase> {
  const code = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, moduleName, "__init__.py"),
    "utf8",
  );

  return {
    code,
    imports: [],
    language: "python3",
    name: moduleName,
  };
}
