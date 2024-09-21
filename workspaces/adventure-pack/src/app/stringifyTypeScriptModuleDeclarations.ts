import type { ReadonlyDeep } from "type-fest";

import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";

import type { GoodyModuleDeclaration } from "../scripts/package-goodies/typescript/extractModuleDeclarations.ts";
import { stringifyTypeScriptInterfaceDeclarations } from "./stringifyTypeScriptInterfaceDeclarations.ts";

// TODO: we should probably not allow importing stuff from the scripts, even if it's just the type

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
