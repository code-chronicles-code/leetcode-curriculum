import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";
import { sleep } from "@code-chronicles/util/sleep";

import { fetchGraphQLData } from "./fetchGraphQLData";
import { questionDifficultyZodType } from "./zod-types/questionDifficultyZodType";
import { questionTitleSlugZodType } from "./zod-types/questionTitleSlugZodType";

const QUERY = `
  query {
    activeDailyCodingChallengeQuestion {
      date
      question {
        difficulty
        questionFrontendId
        title
        titleSlug
      }
    }
  }
`
  .trim()
  .replace(/\s+/g, " ");

const questionZodType = z.object({
  difficulty: questionDifficultyZodType,
  questionFrontendId: numericIdAsNumberZodType,
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugZodType,
});

const activeDailyCodingChallengeQuestionZodType = z
  .object({
    activeDailyCodingChallengeQuestion: z.object({
      date: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/),
      question: questionZodType,
    }),
  })
  .transform((data) => data.activeDailyCodingChallengeQuestion);

export type ActiveDailyCodingChallengeQuestion = z.infer<
  typeof activeDailyCodingChallengeQuestionZodType
>;

export async function getActiveDailyCodingChallengeQuestionWithoutDateValidation(): Promise<ActiveDailyCodingChallengeQuestion> {
  const { data } = await fetchGraphQLData(QUERY);
  return activeDailyCodingChallengeQuestionZodType.parse(data);
}

export async function getActiveDailyCodingChallengeQuestionWithDateValidation({
  wrongDateRetries = 3,
}: {
  wrongDateRetries?: number;
} = {}): Promise<ActiveDailyCodingChallengeQuestion> {
  for (let retry = 0; retry <= wrongDateRetries; ++retry) {
    const res =
      // eslint-disable-next-line no-await-in-loop
      await getActiveDailyCodingChallengeQuestionWithoutDateValidation();

    const now = new Date();
    const today = [
      now.getUTCFullYear(),
      (now.getUTCMonth() + 1).toString().padStart(2, "0"),
      now.getUTCDate().toString().padStart(2, "0"),
    ].join("-");

    if (res.date === today) {
      return res;
    }

    // Wait a minute then try again.
    // eslint-disable-next-line no-await-in-loop
    await sleep(60000);
  }

  throw new Error("Exhausted wrong date retries!");
}
