import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";

export function isArrayOfDataByDifficulty(
  arr: unknown[],
): arr is ({ difficulty: string } & Record<string, unknown>)[] {
  return arr.every(
    (elem) => isNonArrayObject(elem) && isString(elem.difficulty),
  );
}
