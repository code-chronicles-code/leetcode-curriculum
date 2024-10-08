import { writeFile } from "node:fs/promises";

import { buildSchema, validateSchema } from "graphql";
import type { ReadonlyDeep } from "type-fest";

import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";
import { stringifyGraphQLSchema } from "./stringifyGraphQLSchema.ts";

const HEADER = `
# THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
# Instead, update the generation process or inputs and run \`yarn scrape-graphql-schema\`.
`;

export async function writeGraphQLSchemaFile(
  filePath: string,
  typeInfos: Iterable<ReadonlyDeep<LeetCodeGraphQLType>>,
) {
  const schema = await stringifyGraphQLSchema(typeInfos);

  maybeThrow(validateSchema(buildSchema(schema)));

  await writeFile(filePath, HEADER.trim() + "\n\n" + schema, {
    encoding: "utf8",
  });
}
