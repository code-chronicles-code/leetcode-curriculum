import type { ReadonlyDeep } from "type-fest";

import { stringifyTypeScriptInterfaceDeclarations } from "./stringifyTypeScriptInterfaceDeclarations";

import type { GoodyModuleDeclaration } from "../scripts/package-goodies/typescript/extractModuleDeclarations";
import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";

const INDENT = "  ";

export function stringifyTypeScriptModuleDeclarations(
  moduleDeclarations: ReadonlyDeep<Record<string, GoodyModuleDeclaration>>,
): string {
  return Object.entries(moduleDeclarations)
    .map(([moduleName, { interfaces = {}, variables = [] }]) => {
      const body = [
        stringifyTypeScriptInterfaceDeclarations(interfaces, {
          indent: INDENT,
        }),
        ...variables.map((variable) => INDENT + variable),
      ]
        .filter((s) => !isStringEmptyOrWhitespaceOnly(s))
        .join("\n\n");

      return `declare ${moduleName} {\n${body}\n}`;
    })
    .join("\n\n");
}
