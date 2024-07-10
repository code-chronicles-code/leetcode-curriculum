import { SourceFile as TSSourceFile, SyntaxKind } from "ts-morph";

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
      .forEach((decl) => {
        const interfaceDecl = decl.asKindOrThrow(
          SyntaxKind.InterfaceDeclaration,
          "Only interface declarations are currently supported in module declarations, got: " +
            decl.getKindName(),
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
          decl
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
