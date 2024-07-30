import type { WritableDeep } from "type-fest";

import type { Python3Goody } from "../../../app/parsers/python3GoodyParser";
import { readCode } from "./readCode";
import { readMetadata } from "./readMetadata";

export type Python3GoodyBase = Omit<WritableDeep<Python3Goody>, "importedBy">;

export async function readBaseGoody(
  moduleName: string,
): Promise<Python3GoodyBase> {
  const [code, { name }] = await Promise.all([
    readCode(moduleName),
    readMetadata(moduleName),
  ]);

  return {
    code,
    imports: [],
    language: "python3",
    name,
  };
}
