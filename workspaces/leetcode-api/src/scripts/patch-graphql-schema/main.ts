import { readFile, writeFile } from "node:fs/promises";

import dedent from "dedent";
import {
  parse as parseGraphQL,
  print as printGraphQL,
  visit as visitGraphQL,
} from "graphql";
import { format as prettierFormat } from "prettier";

import { SCHEMA_FILE_ORIGINAL } from "../scrape-graphql-schema/constants.ts";
import { SCHEMA_FILE_PATCHED } from "./constants.ts";
import { visitor } from "./visitor.ts";

const GENERATED_HEADER =
  dedent`
    # THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
    # Instead, update the generation process or inputs and run \`yarn patch-graphql-schema\`.
  ` + "\n";

async function main(): Promise<void> {
  const originalSchema = await readFile(SCHEMA_FILE_ORIGINAL, {
    encoding: "utf8",
  });

  const patchedSchemaAst = visitGraphQL(parseGraphQL(originalSchema), visitor);
  const patchedSchema = await prettierFormat(printGraphQL(patchedSchemaAst), {
    parser: "graphql",
  });

  await writeFile(
    SCHEMA_FILE_PATCHED,
    [GENERATED_HEADER, patchedSchema].join("\n"),
    { encoding: "utf8" },
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
