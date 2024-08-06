import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";

import { fetchGraphQLData } from "./fetchGraphQLData";
import { questionDifficultyParser } from "./parsers/questionDifficultyParser";
import { questionTitleSlugParser } from "./parsers/questionTitleSlugParser";

const QUERY = `
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
`
  .trim()
  .replace(/\s+/g, " ");

const questionParser = z.object({
  difficulty: questionDifficultyParser,
  isPaidOnly: z.boolean(),
  questionFrontendId: numericIdAsNumberZodType,
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugParser,
});

export type QuestionListQuestion = z.infer<typeof questionParser>;

const questionListParser = z
  .object({
    questionList: z.object({
      data: z.array(questionParser),
      totalNum: z.number().int().nonnegative(),
    }),
  })
  .transform(({ questionList: { data, totalNum } }) => ({
    questions: data,
    totalNum,
  }));

export type QuestionList = z.infer<typeof questionListParser>;

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

export async function getQuestionList({
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
  return questionListParser.parse(data);
}
