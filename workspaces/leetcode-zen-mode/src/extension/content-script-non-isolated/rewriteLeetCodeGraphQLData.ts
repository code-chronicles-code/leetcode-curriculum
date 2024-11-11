import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { stringToCase } from "@code-chronicles/util/stringToCase";

import { SETTINGS_ATTRIBUTE } from "../constants.ts";
import { rewriteLeetCodeAggregateDataForDifficulty } from "./rewriteLeetCodeAggregateDataForDifficulty.ts";
import { PREFERRED_STRING_CASE, STRING_CASE_CHECKERS } from "./stringCase.ts";
import type { Difficulty } from "../usePreferredDifficulty.ts";

let preferredDifficulty: Difficulty | null = null;
function getPreferredDifficulty(prevJsonParse: typeof JSON.parse): Difficulty {
  if (preferredDifficulty == null) {
    try {
      preferredDifficulty = (prevJsonParse(
        String(document.documentElement.getAttribute(SETTINGS_ATTRIBUTE)),
      ) ?? "Easy") as Difficulty;
    } catch (err) {
      console.error(err);
      preferredDifficulty = "Easy";
    }
  }

  return preferredDifficulty;
}

export function rewriteLeetCodeGraphQLData(
  value: unknown,
  prevJsonParse: typeof JSON.parse,
): unknown {
  if (Array.isArray(value)) {
    // Arrays get some extra processing.
    const rewrittenValue = rewriteLeetCodeAggregateDataForDifficulty(value);

    // Recursively process array values.
    return rewrittenValue.map((value) =>
      rewriteLeetCodeGraphQLData(value, prevJsonParse),
    );
  }

  if (isNonArrayObject(value)) {
    // Recursively process object values.
    return mapObjectValues(value, (value) =>
      rewriteLeetCodeGraphQLData(value, prevJsonParse),
    );
  }

  // Rewrite difficulty strings!
  if (isString(value) && /^(?:easy|medium|hard)$/i.test(value)) {
    const stringCase =
      STRING_CASE_CHECKERS.find(([, checker]) => checker(value))?.[0] ??
      PREFERRED_STRING_CASE;
    return stringToCase(getPreferredDifficulty(prevJsonParse), stringCase);
  }

  // Pass everything else through unchanged.
  return value;
}
