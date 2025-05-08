import { isNonArrayObject } from "@code-chronicles/util/isNonArrayObject";
import { isString } from "@code-chronicles/util/isString";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { stringToCase } from "@code-chronicles/util/stringToCase";

import { rewriteLeetCodeAggregateDataForDifficulty } from "./rewriteLeetCodeAggregateDataForDifficulty.ts";
import { PREFERRED_STRING_CASE, STRING_CASE_CHECKERS } from "./stringCase.ts";
import { difficultyZodType } from "../problemDifficulties.ts";
import type { PublicSettings } from "../shared/public-settings/publicSettingsZodType.ts";
import { readPublicSettingsFromDocumentAttribute } from "../shared/public-settings/readPublicSettingsFromDocumentAttribute.ts";

let publicSettings: PublicSettings | null = null;
function getPublicSettings(prevJsonParse: typeof JSON.parse): PublicSettings {
  return (publicSettings ??=
    readPublicSettingsFromDocumentAttribute(prevJsonParse));
}

export function rewriteLeetCodeGraphQLData(
  value: unknown,
  prevJsonParse: typeof JSON.parse,
): unknown {
  if (Array.isArray(value)) {
    const { preferredDifficulty } = getPublicSettings(prevJsonParse);

    // Arrays get some extra processing.
    const rewrittenValue = rewriteLeetCodeAggregateDataForDifficulty(
      value,
      preferredDifficulty,
    );

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
  if (isString(value) && difficultyZodType.safeParse(value).success) {
    const stringCase =
      STRING_CASE_CHECKERS.find(([, checker]) => checker(value))?.[0] ??
      PREFERRED_STRING_CASE;
    const { preferredDifficulty } = getPublicSettings(prevJsonParse);
    return stringToCase(preferredDifficulty, stringCase);
  }

  // Pass everything else through unchanged.
  return value;
}
