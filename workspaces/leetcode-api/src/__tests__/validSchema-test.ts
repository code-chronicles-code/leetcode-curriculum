import { readFile } from "node:fs/promises";

import { describe, expect, it } from "@jest/globals";
import { buildSchema, validateSchema } from "graphql";

import {
  SCHEMA_ORIGINAL_FILE,
  SCHEMA_PATCHED_FILE,
} from "../scripts/scrape-graphql-schema/constants.ts";

describe("GraphQL schema", () => {
  it.each([SCHEMA_ORIGINAL_FILE, SCHEMA_PATCHED_FILE])(
    "validates %s",
    async (schemaPath) => {
      const schema = buildSchema(await readFile(schemaPath, "utf8"));
      expect(validateSchema(schema)).toStrictEqual([]);
    },
  );
});
