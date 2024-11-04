import dedent from "dedent";

import type { ActiveDailyCodingChallengeQuestion } from "@code-chronicles/leetcode-api/active-daily-coding-challenge-question";
import { SEC_IN_DAY } from "@code-chronicles/util/timeConstants";
import { yearMonthDayToTimestampInSeconds } from "@code-chronicles/util/yearMonthDayToTimestampInSeconds";

import { formatTimestampForDiscord } from "./formatTimestampForDiscord.ts";

// TODO: jest tests
export function getPotdMessage({
  date,
  question: { difficulty, questionFrontendId, title, titleSlug },
}: ActiveDailyCodingChallengeQuestion): string {
  const link = `https://leetcode.com/problems/${titleSlug}/`;

  return dedent`
    ✨ New LeetCode problem of the day: [${questionFrontendId}. ${title}](${link}) (marked ${difficulty}) ✨

    -# Problem due: ⏳ **${formatTimestampForDiscord(yearMonthDayToTimestampInSeconds(date) + SEC_IN_DAY, "R")}** ⏳
  `;
}
