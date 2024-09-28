import { readFile } from "node:fs/promises";

import { describe, expect, it } from "@jest/globals";
import { buildSchema, validateSchema } from "graphql";

import { SCHEMA_FILE } from "../scripts/scrape-graphql-schema/constants.ts";

describe("GraphQL schema", () => {
  it("validates", async () => {
    const schema = buildSchema(await readFile(SCHEMA_FILE, "utf8"));
    expect(validateSchema(schema)).toStrictEqual([]);
  });
});
