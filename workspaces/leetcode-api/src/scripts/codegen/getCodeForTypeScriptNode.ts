import { createPrinter, EmitHint, type Statement } from "typescript";

import { createTypeScriptSourceFile } from "./createTypeScriptSourceFile.ts";

export function getCodeForTypeScriptNode(statement: Statement): string {
  return createPrinter().printNode(
    EmitHint.Unspecified,
    statement,
    createTypeScriptSourceFile(""),
  );
}
