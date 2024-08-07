import fsPromises from "node:fs/promises";
import path from "node:path";

import type { WritableDeep } from "type-fest";

import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import type { TypeScriptGoody } from "../../../app/zod-types/typeScriptGoodyZodType";
import { createSourceFile } from "./createSourceFile";
import { extractImports } from "./extractImports";
import { extractModuleDeclarations } from "./extractModuleDeclarations";
import { formatCode } from "./formatCode";
import { removeNode } from "./removeNode";

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
    imports: Array.from(imports).map((im) => stripPrefixOrThrow(im, "../")),
    language: "typescript",
    moduleDeclarations,
    name,
  };
}
