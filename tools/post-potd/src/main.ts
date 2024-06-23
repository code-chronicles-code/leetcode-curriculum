import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";
import process from "process";

import { getActiveDailyCodingChallengeQuestionWithDateValidation as getPotd } from "@code-chronicles/leetcode-api";

import { sleep } from "@code-chronicles/leetcode-api/src/sleep";

import { readScriptData, writeScriptData } from "./readScriptData";

import secrets from "../secrets_DO_NOT_COMMIT_OR_SHARE.json";

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
  while (true) {
    const { date, question: potd } = await getPotd();
    const scriptData = await readScriptData();

    if (
      scriptData.lastPostedDate != null &&
      date === scriptData.lastPostedDate
    ) {
      const nextDayInSeconds = (() => {
        const d = new Date(0);
        const [year, month, day] = date.split("-").map(Number);
        d.setUTCFullYear(year, month - 1, day);
        return d.getTime() / 1000 + 24 * 60 * 60;
      })();

      const secondsToSleep = Math.max(
        60,
        Math.floor(nextDayInSeconds - Date.now() / 1000),
      );
      console.log(
        `Already posted the problem for ${date}, will sleep ${secondsToSleep} seconds until the next day.`,
      );
      await sleep(secondsToSleep * 1000);
      continue;
    }

    const potdLink = `https://leetcode.com/problems/${potd.titleSlug}/`;
    const message = `New LeetCode problem of the day! [${potd.questionFrontendId}. ${potd.title}](${potdLink})`;
    await sendDiscordMessage(message);
    await writeScriptData({ lastPostedDate: date });
    console.log(message);
    break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
