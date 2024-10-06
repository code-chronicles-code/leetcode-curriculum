import { gql } from "graphql-request";
import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";
import { sleep } from "@code-chronicles/util/sleep";
import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";
import { timestampInSecondsToYearMonthDay } from "@code-chronicles/util/timestampInSecondsToYearMonthDay";

import { getGraphQLClient } from "./getGraphQLClient.ts";
import { questionDifficultyZodType } from "./zod-types/questionDifficultyZodType.ts";
import { questionTitleSlugZodType } from "./zod-types/questionTitleSlugZodType.ts";

const QUERY = gql`
  query fetchActiveDailyCodingChallengeQuestion {
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
`;

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

export async function fetchActiveDailyCodingChallengeQuestionWithoutDateValidation(): Promise<ActiveDailyCodingChallengeQuestion> {
  const data = await getGraphQLClient().request(QUERY);

  return activeDailyCodingChallengeQuestionZodType.parse(data);
}

export async function fetchActiveDailyCodingChallengeQuestionWithDateValidation({
  wrongDateRetries = 3,
}: {
  wrongDateRetries?: number;
} = {}): Promise<ActiveDailyCodingChallengeQuestion> {
  for (let retry = 0; retry <= wrongDateRetries; ++retry) {
    const res =
      // eslint-disable-next-line no-await-in-loop
      await fetchActiveDailyCodingChallengeQuestionWithoutDateValidation();

    const today = timestampInSecondsToYearMonthDay(Date.now() / MS_IN_SEC);
    if (res.date === today) {
      return res;
    }

    // Wait a minute then try again.
    // eslint-disable-next-line no-await-in-loop
    await sleep(60000);
  }

  throw new Error("Exhausted wrong date retries!");
}
