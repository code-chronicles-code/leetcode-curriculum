import type { ReadonlyDeep } from "type-fest";

import { replaceInMap } from "@code-chronicles/util/replaceInMap";

import type { LeetCodeGraphQLType } from "../../fetchGraphQLTypeInformation.ts";
import { markFieldsNonNull } from "./markFieldsNonNull.ts";

// TODO: support setting list values to be non-null

const FIELDS_TO_MARK_NON_NULL = {
  Query: [
    "activeDailyCodingChallengeQuestion",
    "questionList",
    "recentAcSubmissionList",
  ],
  QuestionNode: [
    "acRate",
    "allowDiscuss",
    "categoryTitle",
    "contributors",
    "dataSchemas",
    "difficulty",
    "discussionCount",
    "dislikes",
    "enableDebugger",
    "enableRunCode",
    "enableSubmit",
    "enableTestMode",
    "envInfo",
    "exampleTestcases",
    "hide",
    "hints",
    "infoVerified",
    "interpretUrl",
    "isPaidOnly",
    "judgerAvailable",
    "judgeType",
    "likes",
    "metaData",
    "mysqlSchemas",
    "nextChallengePairs(questionId",
    "nextChallenges",
    "questionDetailUrl",
    "questionFrontendId",
    "questionId",
    "questionTitle",
    "questionTitleSlug",
    "questionType",
    "randomQuestionUrl",
    "sampleTestCase",
    "sessionId",
    "similarQuestions",
    "solutionNum",
    "stats",
    "submitUrl",
    "topicTags",
    "urlManager",
  ],
  SubmissionDumpNode: ["id", "timestamp", "title", "titleSlug"],
} as const;

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
