import type { JsonValue } from "type-fest";

import { isObject } from "@code-chronicles/util/isObject";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";

export function rewriteGraphQLData(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map(rewriteGraphQLData);
  }

  if (isObject(value)) {
    return mapObjectValues(value, rewriteGraphQLData);
  }

  if (value === "Hard" || value === "Medium") {
    return "Easy";
  }

  return value;
}
