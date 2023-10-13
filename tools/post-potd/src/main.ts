import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";
import { parse as parseHtml } from "node-html-parser";
import nullthrows from "nullthrows";
import process from "process";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

type LeetCodeQueryData = {
  // TODO: replace with actual validated type
  state: any;
  queryKey: [string, ...unknown[]];
};

type Question = {
  questionFrontendId: string;
  title: string;
  titleSlug: string;
};

async function getDataForLeetCodeUrl(
  url: string,
): Promise<LeetCodeQueryData[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  // The page's data is stored in a <script> element with id "__NEXT_DATA__".
  const html = parseHtml(await response.text());
  const data = JSON.parse(html.getElementById("__NEXT_DATA__").innerText);

  // The data we care about is typically nested like this.
  // TODO: validate the structure
  return data.props.pageProps.dehydratedState.queries;
}

async function getLatestLeetCodePotd(): Promise<Question> {
  const queries = await getDataForLeetCodeUrl(
    "https://leetcode.com/problemset/all/",
  );
  const relevantQueries = queries.filter(
    (query) => query.queryKey[0] === "dailyCodingQuestionRecords",
  );

  const problems = relevantQueries.flatMap(
    (query) => query.state.data.dailyCodingChallengeV2.challenges,
  );
  const latestProblem = maxBy(problems, (problem) => problem.date);

  return nullthrows(
    latestProblem?.question,
    "Did not find a problem of the day!",
  );
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
  const potd = await getLatestLeetCodePotd();

  const potdNumber = parseInt(potd.questionFrontendId);
  const potdTitle = potd.title;
  const potdLink = "https://leetcode.com/problems/" + potd.titleSlug + "/";

  const message = `New LeetCode problem of the day! [${potdNumber}. ${potdTitle}](${potdLink})`;
  await sendDiscordMessage(message);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
