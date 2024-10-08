import { readFile } from "node:fs/promises";

import type { SourceFile } from "typescript";

import { createTypeScriptSourceFile } from "./createTypeScriptSourceFile.ts";

export async function readTypeScriptSourceFile(
  path: string,
): Promise<SourceFile> {
  const sourceText = await readFile(path, { encoding: "utf8" });
  return createTypeScriptSourceFile(sourceText);
}

// TODO: merge typescript and ts-morph stuff
