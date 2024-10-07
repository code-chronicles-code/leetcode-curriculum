import { writeFile } from "node:fs/promises";

import { buildSchema, validateSchema } from "graphql";
import type { ReadonlyDeep } from "type-fest";

import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";
import { stringifyGraphQLSchema } from "./stringifyGraphQLSchema.ts";

export async function writeGraphQLSchemaFile(
  filePath: string,
  typeInfos: Iterable<ReadonlyDeep<LeetCodeGraphQLType>>,
) {
  const schema = await stringifyGraphQLSchema(typeInfos);

  maybeThrow(validateSchema(buildSchema(schema)));

  await writeFile(filePath, schema, { encoding: "utf8" });
}
