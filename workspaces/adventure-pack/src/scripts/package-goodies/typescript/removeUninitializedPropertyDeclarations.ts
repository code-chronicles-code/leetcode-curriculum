import { SyntaxKind } from "typescript";

import { createSourceFile } from "./createSourceFile.ts";
import { removeNode } from "./removeNode.ts";

export function removeUninitializedPropertyDeclarations(code: string): string {
  const sourceFile = createSourceFile(code);
  sourceFile.getClasses().forEach((c) => {
    c.getChildSyntaxListOrThrow()
      .getChildrenOfKind(SyntaxKind.PropertyDeclaration)
      .forEach((decl) => {
        if (!decl.hasInitializer()) {
          removeNode(decl);
        }
      });
  });

  return sourceFile.getFullText();
}
