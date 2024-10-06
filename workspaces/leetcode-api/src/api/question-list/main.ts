import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";

import { fetchGraphQL, type QueryVariables } from "./fetchGraphQL.generated.ts";
import { questionDifficultyZodType } from "../../zod-types/questionDifficultyZodType.ts";
import { questionTitleSlugZodType } from "../../zod-types/questionTitleSlugZodType.ts";

const questionZodType = z.object({
  difficulty: questionDifficultyZodType,
  isPaidOnly: z.boolean(),
  questionFrontendId: numericIdAsNumberZodType,
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugZodType,
});

export type QuestionListQuestion = z.infer<typeof questionZodType>;

const questionListZodType = z
  .object({
    questionList: z.object({
      data: z.array(questionZodType),
      totalNum: z.number().int().nonnegative(),
    }),
  })
  .transform(({ questionList: { data, totalNum } }) => ({
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
  const data = await fetchGraphQL({
    categorySlug,
    filters,
    limit,
    skip,
  });

  return questionListZodType.parse(data);
}
