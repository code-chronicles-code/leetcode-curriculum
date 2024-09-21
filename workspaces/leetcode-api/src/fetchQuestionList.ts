import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";
import { squashWhitespace } from "@code-chronicles/util/squashWhitespace";

import { fetchGraphQLData } from "./fetchGraphQLData.ts";
import { questionDifficultyZodType } from "./zod-types/questionDifficultyZodType.ts";
import { questionTitleSlugZodType } from "./zod-types/questionTitleSlugZodType.ts";

const QUERY = squashWhitespace(`
  query ($categorySlug: String!, $limit: Int, $skip: Int, $filters: QuestionListFilterInput!) {
    questionList(
      categorySlug: $categorySlug
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      data {
        difficulty
        isPaidOnly
        questionFrontendId
        title
        titleSlug
      }
      totalNum
    }
  }
`);

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
  // TODO: more specific type if possible
  filters?: Record<string, unknown>;
  limit?: number;
  skip?: number;
} = {}): Promise<QuestionList> {
  const { data } = await fetchGraphQLData(QUERY, {
    categorySlug,
    filters,
    limit,
    skip,
  });
  return questionListZodType.parse(data);
}
