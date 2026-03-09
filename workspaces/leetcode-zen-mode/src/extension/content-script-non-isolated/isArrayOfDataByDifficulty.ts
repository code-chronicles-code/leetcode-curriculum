import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";

import { difficultyZodType, type Difficulty } from "../problemDifficulties.ts";

export function isArrayOfDataByDifficulty(
  arr: unknown[],
): arr is ({ difficulty: Difficulty } & Record<string, unknown>)[] {
  return arr.every(
    (elem) =>
      isNonArrayObject(elem) &&
      difficultyZodType.safeParse(elem.difficulty).success,
  );
}
