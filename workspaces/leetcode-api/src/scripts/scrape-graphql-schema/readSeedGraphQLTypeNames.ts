import { readFile } from "node:fs/promises";

import { buildSchema } from "graphql";

import { addAllToSet } from "@code-chronicles/util/addAllToSet";

import { SCHEMA_ORIGINAL_FILE } from "./constants.ts";

export async function readSeedGraphQLTypeNames(): Promise<string[]> {
  // Start with some built-in types.
  const res = new Set([
    "Query",
    "Mutation",
    "Subscription",
    "__Schema",
    "__Type",
    "__Directive",
    "__EnumValue",
    "__InputValue",
    "__Field",
    "Int",
    "Float",
    "String",
    "Boolean",
    "ID",
  ]);

  // Try to read additional types from the saved schema file, but don't crash
  // on errors.
  try {
    const schema = buildSchema(await readFile(SCHEMA_ORIGINAL_FILE, "utf8"));
    addAllToSet(res, Object.keys(schema.getTypeMap()));
  } catch (err) {
    console.error(err);
  }

  return [...res].sort();
}
