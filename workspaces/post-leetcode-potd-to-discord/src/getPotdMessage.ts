import type { ActiveDailyCodingChallengeQuestion } from "@code-chronicles/leetcode-api";
import { SEC_IN_DAY } from "@code-chronicles/util/timeConstants";
import { yearMonthDayToTimestampInSeconds } from "@code-chronicles/util/yearMonthDayToTimestampInSeconds";

import { formatTimestampForDiscord } from "./formatTimestampForDiscord.js";

export function getPotdMessage({
  date,
  question: { difficulty, questionFrontendId, title, titleSlug },
}: ActiveDailyCodingChallengeQuestion): string {
  const link = `https://leetcode.com/problems/${titleSlug}/`;
  const sentences = [
    `✨ New LeetCode problem of the day: [${questionFrontendId}. ${title}](${link}) ✨`,
  ];

  switch (difficulty) {
    case "Easy": {
      sentences.push("It's marked easy, so don't overthink it!");
      break;
    }
    case "Medium": {
      sentences.push("It's marked medium, so nothing too scary.");
      break;
    }
    case "Hard": {
      sentences.push(
        "It's marked hard, but that's just a label. Ask for help here if you need it!",
      );
      break;
    }
  }

  sentences.push(
    `\n-# Problem due - ⏳ ****${formatTimestampForDiscord(yearMonthDayToTimestampInSeconds(date) + SEC_IN_DAY, "R")}**** ⏳`,
  );

  return sentences.join("\n");
}
