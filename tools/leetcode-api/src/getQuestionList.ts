import { z } from "zod";

import { getGraphQLData } from "./getGraphQLData";

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

const questionParser = z
  .object({
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    isPaidOnly: z.boolean(),
    questionFrontendId: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]*$/)
      .transform((value) => parseInt(value, 10)),
    title: z.string().trim().min(1),
    titleSlug: z
      .string()
      .trim()
      .regex(/^[a-z0-9\-]+$/),
  })
  .transform(
    ({ titleSlug, questionFrontendId, title, difficulty, isPaidOnly }) => ({
      code: titleSlug,
      problemNumber: questionFrontendId,
      name: title,
      difficulty,
      isPremium: isPaidOnly,
    }),
  );

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

export async function getQuestionList({
  categorySlug = "all-code-essentials",
  filters = {},
  limit,
  skip,
}: {
  categorySlug?: string;
  filters?: Record<string, unknown>;
  limit?: number;
  skip?: number;
} = {}): Promise<QuestionList> {
  const { data } = await getGraphQLData(QUERY, {
    categorySlug,
    filters,
    limit,
    skip,
  });
  return questionListParser.parse(data);
}
