import type { ReadonlyDeep } from "type-fest";

import { replaceInMap } from "@code-chronicles/util/replaceInMap";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";
import { markFieldsNonNull } from "./markFieldsNonNull.ts";

const FIELDS_TO_MARK_NON_NULL: ReadonlyDeep<Record<string, string[]>> = {
  Query: ["activeDailyCodingChallengeQuestion", "questionList", "recentAcSubmissionList", ],
  QuestionNode: ["difficulty", "isPaidOnly", "questionFrontendId"],
  SubmissionDumpNode: ["id", "timestamp", "title", "titleSlug"],
};

export function patchGraphQLSchema(
  scrapedTypeInfos: ReadonlyMap<string, ReadonlyDeep<LeetCodeGraphQLType>>,
): Map<string, ReadonlyDeep<LeetCodeGraphQLType>> {
  const typeInfos = new Map(scrapedTypeInfos);

  for (const [typeName, fieldsToMarkNonNull] of Object.entries(
    FIELDS_TO_MARK_NON_NULL,
  )) {
    replaceInMap(typeInfos, typeName, (typeInfo) =>
      markFieldsNonNull(typeInfo, fieldsToMarkNonNull),
    );
  }

  return typeInfos;
}
