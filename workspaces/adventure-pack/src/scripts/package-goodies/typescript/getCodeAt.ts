import type { SourceFile as TSSourceFile } from "ts-morph";

export function getCodeAt(
  sourceFile: TSSourceFile,
  range: readonly [number, number],
): string {
  return sourceFile.getFullText().slice(...range);
}
