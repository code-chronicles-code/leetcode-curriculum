import { z } from "zod";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";

import { fetchGraphQL, type QueryVariables } from "./fetchGraphQL.generated.ts";
import { questionDifficultyZodType } from "../../zod-types/questionDifficultyZodType.ts";
import { questionTitleSlugZodType } from "../../zod-types/questionTitleSlugZodType.ts";

const questionZodType = z
  .object({
    challengeQuestionsV2: z
      .array(z.object({ date: z.string() }).transform(({ date }) => date))
      .transform((dates) =>
        [...dates].sort(compareStringsCaseInsensitive).reverse(),
      ),
    difficulty: questionDifficultyZodType,
    isPaidOnly: z.boolean(),
    questionFrontendId: numericIdAsNumberZodType,
    title: z.string().trim().min(1),
    titleSlug: questionTitleSlugZodType,
  })
  .transform(({ challengeQuestionsV2, ...rest }) => ({
    chalengeQuestionDates: challengeQuestionsV2,
    ...rest,
  }));

export type QuestionListQuestion = z.infer<typeof questionZodType>;

const questionListZodType = z
  .object({
    data: z.array(questionZodType),
    totalNum: z.number().int().nonnegative(),
  })
  .transform(({ data, totalNum }) => ({
    questions: data,
    totalNum,
  }));

export type QuestionList = z.infer<typeof questionListZodType>;

// TODO: see if there's a way we can fetch these...
export enum CategorySlug {
  ALL_TOPICS = "all-code-essentials",
  ALGORITHMS = "algorithms",
  DATABASE = "database",
  SHELL = "shell",
  CONCURRENCY = "concurrency",
  JAVASCRIPT = "javascript",
  PANDAS = "pandas",
}

export async function fetchQuestionList({
  categorySlug = CategorySlug.ALL_TOPICS,
  filters = {},
  limit,
  skip,
}: {
  categorySlug?: CategorySlug;
  filters?: QueryVariables["filters"];
  limit: number;
  skip: number;
}): Promise<QuestionList> {
  const { questionList } = await fetchGraphQL({
    categorySlug,
    filters,
    limit,
    skip,
  });

  return questionListZodType.parse(questionList);
}
