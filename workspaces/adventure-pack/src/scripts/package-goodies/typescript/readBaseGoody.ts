import fsPromises from "node:fs/promises";
import path from "node:path";

import type { WritableDeep } from "type-fest";

import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";
import { stripSuffixOrThrow } from "@code-chronicles/util/stripSuffixOrThrow";

import type { TypeScriptGoody } from "../../../app/zod-types/typeScriptGoodyZodType.ts";
import { createSourceFile } from "./createSourceFile.ts";
import { extractImports } from "./extractImports.ts";
import { extractModuleDeclarations } from "./extractModuleDeclarations.ts";
import { formatCode } from "./formatCode.ts";
import { removeNode } from "./removeNode.ts";

export const GOODIES_DIRECTORY = path.join("goodies", "typescript");

export type TypeScriptGoodyBase = Omit<
  WritableDeep<TypeScriptGoody>,
  "importedBy"
>;

export async function readBaseGoody(
  name: string,
): Promise<TypeScriptGoodyBase> {
  const code = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, name, "index.ts"),
    "utf8",
  );

  const sourceFile = createSourceFile(code);
  const imports = extractImports(sourceFile);
  const moduleDeclarations = extractModuleDeclarations(sourceFile);

  sourceFile.getExportDeclarations().forEach((decl) => {
    if (decl.getNamedExports().length === 0) {
      removeNode(decl, { preserveTrivia: false });
    }
  });

  const updatedCode = await formatCode(sourceFile.getFullText());

  return {
    code: updatedCode,
    imports: Array.from(imports, (im) =>
      stripSuffixOrThrow(stripPrefixOrThrow(im, "../"), "/index.ts"),
    ),
    language: "typescript",
    moduleDeclarations,
    name,
  };
}
