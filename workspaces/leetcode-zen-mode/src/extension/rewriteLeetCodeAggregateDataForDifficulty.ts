import type { JsonArray, JsonObject } from "type-fest";
import nullthrows from "nullthrows";

import { firstOrThrow } from "@code-chronicles/util/firstOrThrow";
import { groupBy } from "@code-chronicles/util/groupBy";
import { isArrayOfNumbers } from "@code-chronicles/util/isArrayOfNumbers";
import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";
import { mergeObjects } from "@code-chronicles/util/mergeObjects";
import { only } from "@code-chronicles/util/only";
import { sum } from "@code-chronicles/util/sum";
import { stringToCase, type Case } from "@code-chronicles/util/stringToCase";

import { PREFERRED_STRING_CASE, STRING_CASE_CHECKERS } from "./stringCase.ts";

function isArrayOfDataByDifficulty(
  arr: JsonArray,
): arr is ({ difficulty: string } & JsonObject)[] {
  return arr.every(
    (elem) =>
      isNonArrayObject(elem) &&
      Object.hasOwn(elem, "difficulty") &&
      isString(elem.difficulty),
  );
}

/**
 * Some of the LeetCode GraphQL data is aggregate statistics about problems
 * by difficulty. This function detects instances of this and tries to
 * re-aggregate.
 */
export function rewriteLeetCodeAggregateDataForDifficulty(
  arr: JsonArray,
): JsonArray {
  // Do nothing if it's not the kind of data we're looking for.
  if (!isArrayOfDataByDifficulty(arr)) {
    return arr;
  }

  // Detect the casing of the difficulties. It could be "Easy", "EASY", or
  // perhaps even "easy".
  const difficultyStringCase = ((): Case => {
    for (const [stringCase, checker] of STRING_CASE_CHECKERS) {
      if (arr.every((elem) => checker(elem.difficulty))) {
        return stringCase;
      }
    }

    return PREFERRED_STRING_CASE;
  })();

  // Prepare some difficulty strings that will come in handy below.
  const allDifficulty = stringToCase("all", difficultyStringCase);
  const easyDifficulty = stringToCase("easy", difficultyStringCase);

  const elementsByDifficulty = groupBy(arr, (elem) =>
    stringToCase(elem.difficulty, difficultyStringCase),
  );

  // If we have a single "All" item and items with difficulties besides
  // "All" and "Easy", we will get rid of the extra items, and instead use
  // a single "Easy" item that's a copy of the "All" item with an updated
  // difficulty.
  if (
    elementsByDifficulty.get(allDifficulty)?.length === 1 &&
    [...elementsByDifficulty.keys()].some(
      (difficulty) =>
        difficulty !== allDifficulty && difficulty !== easyDifficulty,
    )
  ) {
    const allElement = only(
      nullthrows(elementsByDifficulty.get(allDifficulty)),
    );
    return [allElement, { ...allElement, difficulty: easyDifficulty }];
  }

  // Another option is that we don't have an "All" item. In this case we
  // will merge the elements into a single one, summing numeric values when
  // the same key appears in multiple elements, and averaging percentages.
  //
  // We also check that there's at most one entry for each difficulty, because
  // if there is more than one then this might not be aggregated data, it's
  // probably just a list of questions, which will be rewritten separately.
  if (
    [...elementsByDifficulty.values()].every((group) => group.length === 1) &&
    [...elementsByDifficulty.keys()].some(
      (difficulty) => difficulty !== easyDifficulty,
    )
  ) {
    return [
      mergeObjects(arr, (values, key) => {
        if (key === "difficulty") {
          return easyDifficulty;
        }

        if (isArrayOfNumbers(values)) {
          const total = sum(values);

          if (key === "percentage") {
            return total / (values.length || 1);
          }

          return total;
        }

        return firstOrThrow(values);
      }),
    ];
  }

  return arr;
}
