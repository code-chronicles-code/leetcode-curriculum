import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";
import process from "process";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

import { getTodaysLeetCodePotd } from "@code-chronicles/leetcode-api";

async function sendDiscordMessage(content: string): Promise<void> {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(secrets.discordToken);

    const channel = await client.channels.fetch(secrets.discordChannelID);
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
  const { question: potd } = await getTodaysLeetCodePotd();
  const potdLink = `https://leetcode.com/problems/${potd.titleSlug}/`;

  const message = `New LeetCode problem of the day! [${potd.problemNumber}. ${potd.title}](${potdLink})`;
  await sendDiscordMessage(message);
  console.log(message);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
