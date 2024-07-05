import fsPromises from "node:fs/promises";
import path from "node:path";
import { SourceFile as TSSourceFile, SyntaxKind } from "ts-morph";

import type { TypeScriptGoody } from "../../../app/parsers/typeScriptGoodyParser";
import { createSourceFile } from "./createSourceFile";
import { extractImports } from "./extractImports";
import { formatCode } from "./formatCode";
import { removeNode } from "./removeNode";

export const GOODIES_DIRECTORY = path.join("goodies", "typescript");

function extractGlobalModuleDeclarations(sourceFile: TSSourceFile): string[] {
  const res: string[] = [];

  sourceFile
    .getDescendantsOfKind(SyntaxKind.ModuleDeclaration)
    .forEach((decl) => {
      if (decl.getName() === "global") {
        res.push(
          decl.getBodyOrThrow().getChildSyntaxListOrThrow().getFullText(),
        );
        removeNode(decl);
      }
    });

  return res;
}

export async function readBasicGoody(name: string): Promise<TypeScriptGoody> {
  const code = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, name, "index.ts"),
    "utf8",
  );

  const sourceFile = createSourceFile(code);
  const imports = extractImports(sourceFile);
  const globalModuleDeclarations = extractGlobalModuleDeclarations(sourceFile);

  sourceFile.getExportDeclarations().forEach((decl) => {
    if (decl.getNamedExports().length === 0) {
      removeNode(decl, { preserveTrivia: false });
    }
  });

  sourceFile.getVariableDeclarations().forEach((decl) => {
    decl.getVariableStatementOrThrow().setIsExported(false);
  });

  const updatedCode = await formatCode(sourceFile.getFullText());

  return {
    code: updatedCode,
    globalModuleDeclarations,
    importedBy: [],
    imports: Array.from(imports),
    name,
    language: "typescript",
  };
}
