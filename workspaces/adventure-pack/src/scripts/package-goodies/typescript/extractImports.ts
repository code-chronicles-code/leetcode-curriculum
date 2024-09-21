import type { SourceFile as TSSourceFile } from "ts-morph";

import { removeNode } from "./removeNode.ts";

export function extractImports(sourceFile: TSSourceFile): Set<string> {
  const imports = new Set<string>();
  for (const decl of sourceFile.getImportDeclarations()) {
    imports.add(decl.getModuleSpecifierValue());
    removeNode(decl, { preserveTrivia: true });
  }

  return imports;
}
