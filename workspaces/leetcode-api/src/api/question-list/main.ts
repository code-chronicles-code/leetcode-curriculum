import { z } from "zod";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { numericIdAsNumberZodType } from "@code-chronicles/util/zod-types/numericIdAsNumberZodType";

import { fetchGraphQL, type QueryVariables } from "./fetchGraphQL.generated.ts";
import { questionDifficultyZodType } from "../../zod-types/questionDifficultyZodType.ts";
import { slugZodType } from "../../zod-types/slugZodType.ts";

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
    titleSlug: slugZodType,
  })
  .transform(({ challengeQuestionsV2, ...rest }) => ({
    chalengeQuestionDates: challengeQuestionsV2,
    ...rest,
  }));

export type QuestionListQuestion = z.infer<typeof questionZodType>;

export type QuestionList = {
  questions: QuestionListQuestion[];
  totalNum: number;
};

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
  const {
    questionList: { data, totalNum },
  } = await fetchGraphQL({
    categorySlug,
    filters,
    limit,
    skip,
  });

  return {
    questions: data.map((q) => questionZodType.parse(q)),
    totalNum,
  };
}
