import { z } from "zod";

import { sleep } from "./sleep";

const leetCodeGraphQLQueryParser = z.object({
  data: z.unknown(),
});

type LeetCodeGraphQLData = z.infer<typeof leetCodeGraphQLQueryParser>;

async function getLeetCodeGraphQLData(
  query: string,
): Promise<LeetCodeGraphQLData> {
  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: {} }),
  });

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return leetCodeGraphQLQueryParser.parse(await response.json());
}

const PROBLEM_OF_THE_DAY_QUERY = `
  query {
    activeDailyCodingChallengeQuestion {
      date
      question {
        questionFrontendId
        title
        titleSlug
      }
    }
  }
`
  .trim()
  .replace(/\s+/g, " ");

const leetCodeQuestionParser = z
  .object({
    questionFrontendId: z.string().regex(/^[1-9][0-9]*$/),
    title: z.string().min(1).trim(),
    titleSlug: z
      .string()
      .trim()
      .regex(/^[a-z0-9\-]+$/),
  })
  .transform(({ questionFrontendId, title, titleSlug }) => ({
    problemNumber: parseInt(questionFrontendId),
    title,
    titleSlug,
  }));

const leetCodeQuestionOfTodayQueryDataParser = z
  .object({
    activeDailyCodingChallengeQuestion: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      question: leetCodeQuestionParser,
    }),
  })
  .transform((data) => data.activeDailyCodingChallengeQuestion);

type LeetCodeQuestionAndDate = z.infer<
  typeof leetCodeQuestionOfTodayQueryDataParser
>;

export async function getLatestLeetCodePotdEvenIfNotTodays(): Promise<LeetCodeQuestionAndDate> {
  const { data } = await getLeetCodeGraphQLData(PROBLEM_OF_THE_DAY_QUERY);
  return leetCodeQuestionOfTodayQueryDataParser.parse(data);
}

export async function getTodaysLeetCodePotd(
  wrongDateRetries: number = 3,
): Promise<LeetCodeQuestionAndDate> {
  for (let retry = 0; retry <= wrongDateRetries; ++retry) {
    const res = await getLatestLeetCodePotdEvenIfNotTodays();

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
    await sleep(60000);
  }

  throw new Error("Exhausted wrong date retries!");
}
