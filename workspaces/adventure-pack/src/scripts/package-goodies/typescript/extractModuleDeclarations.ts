import { type SourceFile as TSSourceFile, SyntaxKind } from "ts-morph";

import { sortTypeScriptModuleAndInterfaceDeclarations } from "../../../app/sortTypeScriptModuleAndInterfaceDeclarations";
import { removeNode } from "./removeNode";

export function extractModuleDeclarations(
  sourceFile: TSSourceFile,
): Record<string, Record<string, string[]>> {
  const res: Record<string, Record<string, string[]>> = {};

  sourceFile.getModules().forEach((mod) => {
    mod
      .getBodyOrThrow()
      .getChildSyntaxListOrThrow()
      .getChildren()
      .forEach((child) => {
        if (child.getKind() === SyntaxKind.SingleLineCommentTrivia) {
          return;
        }

        const interfaceDecl = child.asKindOrThrow(
          SyntaxKind.InterfaceDeclaration,
          "Only interface declarations are currently supported in module declarations, got: " +
            child.getKindName(),
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

        ((res[mod.getName()] ??= {})[interfaceKey] ??= []).push(
          interfaceDecl
            .getChildSyntaxListOrThrow()
            .getFullText()
            .replace(/^\n+/, "")
            .replace(/\n+$/, ""),
        );
      });

    removeNode(mod);
  });

  return sortTypeScriptModuleAndInterfaceDeclarations(res);
}
