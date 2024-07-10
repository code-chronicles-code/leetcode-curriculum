import type { ReadonlyDeep } from "type-fest";

import { stringifyTypeScriptInterfaceDeclarations } from "./stringifyTypeScriptInterfaceDeclarations";

export function stringifyTypeScriptModuleDeclarations(
  moduleDeclarations: ReadonlyDeep<Record<string, Record<string, string[]>>>,
): string {
  return Object.entries(moduleDeclarations)
    .map(
      ([moduleName, interfaceDeclarations]) =>
        `declare ${moduleName} {\n${stringifyTypeScriptInterfaceDeclarations(interfaceDeclarations, "  ")}\n}`,
    )
    .join("\n\n");
}
