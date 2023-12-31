import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";
import process from "process";
import { z } from "zod";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

const leetGraphQLQueryParser = z.object({
  data: z.unknown(),
});

type LeetCodeGraphQLData = z.infer<typeof leetGraphQLQueryParser>;

async function getLeetCodeGraphQLData(
  operationName: string,
  query: string,
): Promise<LeetCodeGraphQLData> {
  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, operationName, variables: {} }),
  });

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return leetGraphQLQueryParser.parse(await response.json());
}

const PROBLEM_OF_THE_DAY_QUERY = `
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      question {
        questionFrontendId
        title
        titleSlug
      }
    }
  }
`.replace(/\s+/g, " ");

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

async function getLatestLeetCodePotd(): Promise<LeetCodeQuestionAndDate> {
  const { data } = await getLeetCodeGraphQLData(
    "questionOfToday",
    PROBLEM_OF_THE_DAY_QUERY,
  );
  return leetCodeQuestionOfTodayQueryDataParser.parse(data);
}

async function sendDiscordMessage(content: string): Promise<void> {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(secrets.token);

    const channel = await client.channels.fetch(secrets.channelID);
    invariant(
      channel?.type === ChannelType.GuildText,
      "Channel must be a text channel!",
    );

    const message = await channel.send(content);
    await message.suppressEmbeds(true);
  } finally {
    await client.destroy();
  }
}

async function main(): Promise<void> {
  const { question: potd } = await getLatestLeetCodePotd();
  const potdLink = `https://leetcode.com/problems/${potd.titleSlug}/`;

  const message = `New LeetCode problem of the day! [${potd.problemNumber}. ${potd.title}](${potdLink})`;
  await sendDiscordMessage(message);
  console.log(message);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
