import { readFile } from "node:fs/promises";

import { describe, expect, it } from "@jest/globals";
import { buildSchema, validateSchema } from "graphql";

import { SCHEMA_FILE_ORIGINAL } from "../scripts/scrape-graphql-schema/constants.ts";
import { SCHEMA_FILE_PATCHED } from "../scripts/patch-graphql-schema/constants.ts";

describe("GraphQL schema", () => {
  it.each([SCHEMA_FILE_ORIGINAL, SCHEMA_FILE_PATCHED])(
    "validates %s",
    async (schemaPath) => {
      const schema = buildSchema(await readFile(schemaPath, "utf8"));
      expect(validateSchema(schema)).toStrictEqual([]);
    },
  );
});
