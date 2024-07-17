import { z } from "zod";

import { sleep } from "@code-chronicles/util";

import { getGraphQLData } from "./getGraphQLData";
import { questionDifficultyParser } from "./parsers/questionDifficultyParser";
import { questionTitleSlugParser } from "./parsers/questionTitleSlugParser";

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

const questionParser = z.object({
  difficulty: questionDifficultyParser,
  questionFrontendId: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/)
    .transform((value) => parseInt(value, 10)),
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugParser,
});

const activeDailyCodingChallengeQuestionParser = z
  .object({
    activeDailyCodingChallengeQuestion: z.object({
      date: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/),
      question: questionParser,
    }),
  })
  .transform((data) => data.activeDailyCodingChallengeQuestion);

export type ActiveDailyCodingChallengeQuestion = z.infer<
  typeof activeDailyCodingChallengeQuestionParser
>;

export async function getActiveDailyCodingChallengeQuestionWithoutDateValidation(): Promise<ActiveDailyCodingChallengeQuestion> {
  const { data } = await getGraphQLData(QUERY);
  return activeDailyCodingChallengeQuestionParser.parse(data);
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
