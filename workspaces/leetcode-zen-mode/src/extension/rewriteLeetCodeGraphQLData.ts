import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { stringToCase } from "@code-chronicles/util/stringToCase";

import { rewriteLeetCodeAggregateDataForDifficulty } from "./rewriteLeetCodeAggregateDataForDifficulty.ts";
import { PREFERRED_STRING_CASE, STRING_CASE_CHECKERS } from "./stringCase.ts";

export function rewriteLeetCodeGraphQLData(value: unknown): unknown {
  if (Array.isArray(value)) {
    // Arrays get some extra processing.
    const rewrittenValue = rewriteLeetCodeAggregateDataForDifficulty(value);

    // Recursively process array values.
    return rewrittenValue.map(rewriteLeetCodeGraphQLData);
  }

  if (isNonArrayObject(value)) {
    // Recursively process object values.
    return mapObjectValues(value, rewriteLeetCodeGraphQLData);
  }

  // Rewrite difficulty strings!
  if (isString(value) && /^(?:medium|hard)$/i.test(value)) {
    const stringCase =
      STRING_CASE_CHECKERS.find(([, checker]) => checker(value))?.[0] ??
      PREFERRED_STRING_CASE;
    return stringToCase("easy", stringCase);
  }

  // Pass everything else through unchanged.
  return value;
}
