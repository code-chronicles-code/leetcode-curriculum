import { createPrinter, EmitHint, type Statement } from "typescript";

import { createTypeScriptSourceFile } from "./createTypeScriptSourceFile.ts";

export function stringifyTypeScriptNode(statement: Statement): string {
  return createPrinter().printNode(
    EmitHint.Unspecified,
    statement,
    createTypeScriptSourceFile(""),
  );
}
