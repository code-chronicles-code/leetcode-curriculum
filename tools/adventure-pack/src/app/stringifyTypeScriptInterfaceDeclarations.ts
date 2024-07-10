import type { ReadonlyDeep } from "type-fest";

export function stringifyTypeScriptInterfaceDeclarations(
  interfaceDeclarations: ReadonlyDeep<Record<string, string[]>>,
  indent: string = "",
): string {
  return Object.entries(interfaceDeclarations)
    .map(
      ([interfaceName, codeGroups]) =>
        `${indent}interface ${interfaceName} {\n${codeGroups.join("\n\n")}\n${indent}}`,
    )
    .join("\n\n");
}
