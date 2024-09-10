import { type SourceFile as TSSourceFile, SyntaxKind } from "ts-morph";

import { invariantViolation } from "@code-chronicles/util/invariantViolation";
import { sortTypeScriptModuleAndInterfaceDeclarations } from "../../../app/sortTypeScriptModuleAndInterfaceDeclarations";
import { removeNode } from "./removeNode";

export type GoodyModuleDeclaration = {
  interfaces?: Record<string, string[]>;
  variables?: string[];
};

export function extractModuleDeclarations(
  sourceFile: TSSourceFile,
): Record<string, GoodyModuleDeclaration> {
  const res: Record<string, GoodyModuleDeclaration> = {};

  sourceFile.getModules().forEach((mod) => {
    mod
      .getBodyOrThrow()
      .getChildSyntaxListOrThrow()
      .getChildren()
      .forEach((child) => {
        switch (child.getKind()) {
          case SyntaxKind.SingleLineCommentTrivia: {
            return;
          }
          case SyntaxKind.InterfaceDeclaration: {
            const interfaceDecl = child.asKindOrThrow(
              SyntaxKind.InterfaceDeclaration,
            );

            const interfaceName = interfaceDecl.getName();
            const typeParameters = interfaceDecl
              .getFirstChildByKind(SyntaxKind.TypeParameter)
              ?.getParentSyntaxListOrThrow()
              .getFullText();

            const interfaceKey =
              typeParameters == null
                ? interfaceName
                : `${interfaceName}<${typeParameters}>`;

            (((res[mod.getName()] ??= {}).interfaces ??= {})[interfaceKey] ??=
              []).push(
              interfaceDecl
                .getChildSyntaxListOrThrow()
                .getFullText()
                .replace(/^\n+/, "")
                .replace(/\n+$/, ""),
            );

            return;
          }
          case SyntaxKind.VariableStatement: {
            ((res[mod.getName()] ??= {}).variables ??= []).push(
              child.getFullText().trim(),
            );
            return;
          }
        }

        invariantViolation(
          "Only interface declarations or variable statements are currently supported in module declarations, got: " +
            child.getKindName(),
        );
      });

    removeNode(mod);
  });

  return sortTypeScriptModuleAndInterfaceDeclarations(res);
}
