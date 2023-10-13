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

async function getLastLeetCodePotd(): Promise<Question> {
  const queries = await getDataForLeetCodeUrl(
    "https://leetcode.com/problemset/all/",
  );
  const relevantQueries = queries.filter(
    (query) => query.queryKey[0] === "dailyCodingQuestionRecords",
  );

  const problems = relevantQueries.flatMap(
    (query) => query.state.data.dailyCodingChallengeV2.challenges,
  );
  // TODO: use max instead of sorting everything
  problems.sort((a, b) => a.date.localeCompare(b.date));
  return nullthrows(
    problems.at(-1)?.question,
    "Did not find a problem of the day!",
  );
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
  const potd = await getLastLeetCodePotd();

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
