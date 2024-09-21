import { readFile } from "node:fs/promises";

import { buildSchema, validateSchema } from "graphql";

import { maybeThrow } from "@code-chronicles/util/maybeThrow";

import { SCHEMA_FILE } from "../scrape-graphql-schema/constants.ts";

async function main(): Promise<void> {
  const schema = buildSchema(await readFile(SCHEMA_FILE, "utf8"));
  maybeThrow(validateSchema(schema));
  console.error("GraphQL schema is valid, yay! 🎉");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
