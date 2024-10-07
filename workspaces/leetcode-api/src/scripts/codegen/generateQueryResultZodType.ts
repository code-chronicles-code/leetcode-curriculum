import { generateZodSchemaVariableStatement } from "ts-to-zod";
import { isTypeAliasDeclaration } from "typescript";

import { only } from "@code-chronicles/util/only";

import { getCodeForTypeScriptNode } from "./getCodeForTypeScriptNode.ts";
import { readTypeScriptSourceFile } from "./readTypeScriptSourceFile.ts";

export async function generateQueryResultZodType(
  filePath: string,
): Promise<string> {
  // TODO: Unfortunately this ends up reading the _old_ version of this file, not the one after the codegen
  const sourceFile = await readTypeScriptSourceFile(filePath);
  const queryNode = only(
    sourceFile.statements
      .filter(isTypeAliasDeclaration)
      .filter((statement) => statement.name.text.endsWith("Query")),
  );

  const { statement } = generateZodSchemaVariableStatement({
    node: queryNode,
    sourceFile,
    varName: "queryResultZodType",
    customJSDocFormatTypes: {},
  });

  return getCodeForTypeScriptNode(statement);
}
