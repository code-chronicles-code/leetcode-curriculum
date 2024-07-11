import type { ReadonlyDeep } from "type-fest";

export function stringifyTypeScriptInterfaceDeclarations(
  interfaceDeclarations: ReadonlyDeep<Record<string, string[]>>,
  { indent = "" }: { indent?: string } = {},
): string {
  return Object.entries(interfaceDeclarations)
    .map(
      ([interfaceName, codeSections]) =>
        `${indent}interface ${interfaceName} {\n${codeSections.join("\n\n")}\n${indent}}`,
    )
    .join("\n\n");
}
