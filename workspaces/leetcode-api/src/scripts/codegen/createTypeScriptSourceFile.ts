import { createSourceFile, ScriptTarget, type SourceFile } from "typescript";

export function createTypeScriptSourceFile(
  sourceText: string = "",
): SourceFile {
  // TODO: share this constant with the adventure pack?
  return createSourceFile("not/a/real/file", sourceText, ScriptTarget.ESNext);
}
