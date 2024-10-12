import { z } from "zod";

import { numericIdAsNumberZodType } from "@code-chronicles/util/zod-types/numericIdAsNumberZodType";
import { sleep } from "@code-chronicles/util/sleep";
import { MS_IN_SEC } from "@code-chronicles/util/timeConstants";
import { timestampInSecondsToYearMonthDay } from "@code-chronicles/util/timestampInSecondsToYearMonthDay";

import { questionDifficultyZodType } from "../../zod-types/questionDifficultyZodType.ts";
import { slugZodType } from "../../zod-types/slugZodType.ts";
import { fetchGraphQL } from "./fetchGraphQL.generated.ts";

const questionZodType = z.object({
  difficulty: questionDifficultyZodType,
  questionFrontendId: numericIdAsNumberZodType,
  title: z.string().trim().min(1),
  titleSlug: slugZodType,
});

export type ActiveDailyCodingChallengeQuestion = {
  date: string;
  question: z.infer<typeof questionZodType>;
};

export async function fetchActiveDailyCodingChallengeQuestionWithoutDateValidation(): Promise<ActiveDailyCodingChallengeQuestion> {
  const {
    activeDailyCodingChallengeQuestion: { date, question },
  } = await fetchGraphQL();

  return {
    date,
    question: questionZodType.parse(question),
  };
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
