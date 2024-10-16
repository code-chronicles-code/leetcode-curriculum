import type { JsonValue } from "type-fest";

import type { Result } from "@code-chronicles/util/getResult";
import { resultify } from "./resultify.ts";

// TODO: could have more interesting typing when there's a reviver

type JsonParseSafe = {
  (text: string): Result<JsonValue>;

  (...args: Parameters<typeof JSON.parse>): Result<unknown>;
};

export const jsonParseSafe: JsonParseSafe = resultify(
  JSON.parse,
) as JsonParseSafe;
