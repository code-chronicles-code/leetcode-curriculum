import type { JsonObject, JsonValue } from "type-fest";

import { isObject } from "./isObject";
import { mapObjectValues } from "./mapObjectValues";
import { sortObjectKeys } from "./sortObjectKeys";

export function sortObjectKeysRecursive<TObj extends JsonValue>(
  obj: TObj,
  compareFn: (a: string, b: string) => number = (a, b): number =>
    a.localeCompare(b),
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
