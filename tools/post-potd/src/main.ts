import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";
import { parse as parseHtml } from "node-html-parser";
import nullthrows from "nullthrows";
import process from "process";
import { z } from "zod";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

const leetCodeQueryParser = z.object({
  state: z.object({ data: z.unknown() }),
  queryKey: z.tuple([z.string()]).rest(z.unknown()),
});

const leetCodeNextDataParser = z.object({
  props: z.object({
    pageProps: z.object({
      dehydratedState: z.object({
        queries: z.array(leetCodeQueryParser),
      }),
    }),
  }),
});

async function getDataForLeetCodeUrl(
  url: string,
): Promise<LeetCodeQueryData[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  // The page's data is stored in a <script> element with id "__NEXT_DATA__".
  // The parsers are based on the structure we've typically observed.
  const html = parseHtml(await response.text());
  const data = leetCodeNextDataParser.parse(
    JSON.parse(html.getElementById("__NEXT_DATA__").innerText),
  );

  return data.props.pageProps.dehydratedState.queries;
}

type LeetCodeQueryData = z.infer<typeof leetCodeQueryParser>;

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

const leetCodeQuestionAndDateParser = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  question: leetCodeQuestionParser,
});

const leetCodePotdQueryDataParser = z.object({
  dailyCodingChallengeV2: z.object({
    challenges: z.array(leetCodeQuestionAndDateParser),
  }),
});

type LeetCodeQuestionAndDate = z.infer<typeof leetCodeQuestionAndDateParser>;

async function getLatestLeetCodePotd(): Promise<LeetCodeQuestionAndDate> {
  const queries = await getDataForLeetCodeUrl(
    "https://leetcode.com/problemset/all/",
  );
  const relevantQueries = queries.filter(
    (query) => query.queryKey[0] === "dailyCodingQuestionRecords",
  );

  const questions = relevantQueries.flatMap(
    (query) =>
      leetCodePotdQueryDataParser.parse(query.state.data).dailyCodingChallengeV2
        .challenges,
  );
  const latestQuestion = maxBy(questions, (q) => q.date);

  return nullthrows(latestQuestion, "Did not find a problem of the day!");
}

function maxBy<T>(
  arr: readonly T[],
  rank: ((elem: T) => string) | ((elem: T) => number),
): T | undefined {
  let maxAndRank: { element: T; rank: string | number } | undefined = undefined;

  for (const elem of arr) {
    const elemRank = rank(elem);
    if (maxAndRank == null || maxAndRank.rank < elemRank) {
      maxAndRank = { element: elem, rank: elemRank };
    }
  }

  return maxAndRank?.element;
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
  const potdLink = "https://leetcode.com/problems/" + potd.titleSlug + "/";

  const message = `New LeetCode problem of the day! [${potd.problemNumber}. ${potd.title}](${potdLink})`;
  await sendDiscordMessage(message);
  console.log(message);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
