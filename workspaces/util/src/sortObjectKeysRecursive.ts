import type { JsonObject, JsonValue } from "type-fest";

import { compareStrings } from "@code-chronicles/util/compareStrings";
import { isObject } from "@code-chronicles/util/isObject";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { sortObjectKeys } from "@code-chronicles/util/sortObjectKeys";

export function sortObjectKeysRecursive<TObj extends JsonValue>(
  obj: TObj,
  compareFn: (a: string, b: string) => number = compareStrings,
  maxDepth: number = Infinity,
): TObj {
  if (maxDepth < 1 || !isObject(obj)) {
    return obj;
  }

  return mapObjectValues(
    sortObjectKeys(obj as JsonObject, compareFn),
    (val: unknown) =>
      sortObjectKeysRecursive(
        val as JsonValue,
        compareFn,
        maxDepth - 1,
      ) as unknown,
  ) as TObj;
}
