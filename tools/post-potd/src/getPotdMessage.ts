import type { ActiveDailyCodingChallengeQuestion } from "@code-chronicles/leetcode-api";

export function getPotdMessage({
  difficulty,
  questionFrontendId,
  title,
  titleSlug,
}: ActiveDailyCodingChallengeQuestion["question"]): string {
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

  return sentences.join("\n");
}
