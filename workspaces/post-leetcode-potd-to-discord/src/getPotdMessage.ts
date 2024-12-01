import dedent from "dedent";

import type { ActiveDailyCodingChallengeQuestion } from "@code-chronicles/leetcode-api/active-daily-coding-challenge-question";
import { SEC_IN_DAY } from "@code-chronicles/util/timeConstants";
import { yearMonthDayToTimestampInSeconds } from "@code-chronicles/util/yearMonthDayToTimestampInSeconds";

import { formatTimestampForDiscord } from "./formatTimestampForDiscord.ts";

const EMOJI_FOR_DIFFICULTY: Record<
  ActiveDailyCodingChallengeQuestion["question"]["difficulty"],
  string
> = {
  Easy: "🥦",
  Medium: "🥕",
  Hard: "🌶️",
};

// TODO: jest tests
export function getPotdMessage({
  date,
  question: { difficulty, questionFrontendId, title, titleSlug },
}: ActiveDailyCodingChallengeQuestion): string {
  const link = `https://leetcode.com/problems/${titleSlug}/`;
  const emoji = EMOJI_FOR_DIFFICULTY[difficulty];

  return dedent`
    New LeetCode problem of the day: ${emoji} [${questionFrontendId}. ${title}](${link}) ${emoji}

    -# Problem due: ⏳ **${formatTimestampForDiscord(yearMonthDayToTimestampInSeconds(date) + SEC_IN_DAY, "R")}** ⏳
  `;
}
