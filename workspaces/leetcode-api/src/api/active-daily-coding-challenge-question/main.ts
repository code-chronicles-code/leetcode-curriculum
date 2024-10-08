import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/numericIdAsNumberZodType";
import { sleep } from "@code-chronicles/util/sleep";
import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";
import { timestampInSecondsToYearMonthDay } from "@code-chronicles/util/timestampInSecondsToYearMonthDay";

import { questionDifficultyZodType } from "../../zod-types/questionDifficultyZodType.ts";
import { questionTitleSlugZodType } from "../../zod-types/questionTitleSlugZodType.ts";
import { fetchGraphQL } from "./fetchGraphQL.generated.ts";

const questionZodType = z.object({
  difficulty: questionDifficultyZodType,
  questionFrontendId: numericIdAsNumberZodType,
  title: z.string().trim().min(1),
  titleSlug: questionTitleSlugZodType,
});

const activeDailyCodingChallengeQuestionZodType = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  question: questionZodType,
});

export type ActiveDailyCodingChallengeQuestion = z.infer<
  typeof activeDailyCodingChallengeQuestionZodType
>;

export async function fetchActiveDailyCodingChallengeQuestionWithoutDateValidation(): Promise<ActiveDailyCodingChallengeQuestion> {
  // TODO: have a way to omit variables when there aren't any
  const { activeDailyCodingChallengeQuestion } = await fetchGraphQL({});

  return activeDailyCodingChallengeQuestionZodType.parse(
    activeDailyCodingChallengeQuestion,
  );
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
