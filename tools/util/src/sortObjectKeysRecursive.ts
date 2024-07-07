import type { JsonValue, ReadonlyDeep } from "type-fest";

import { isObject } from "./isObject";
import { mapObjectValues } from "./mapObjectValues";
import { sortObjectKeys } from "./sortObjectKeys";

export function sortObjectKeysRecursive<TObj extends JsonValue>(
  obj: ReadonlyDeep<TObj>,
  compareFn: (a: string, b: string) => number = (a, b): number =>
    a.localeCompare(b),
  maxDepth: number = Infinity,
): ReadonlyDeep<TObj> {
  if (maxDepth < 1 || !isObject(obj)) {
    return obj;
  }

  return mapObjectValues(
    sortObjectKeys(obj),
    (val: unknown) =>
      sortObjectKeysRecursive(
        val as JsonValue,
        compareFn,
        maxDepth - 1,
      ) as unknown,
  ) as ReadonlyDeep<TObj>;
}
