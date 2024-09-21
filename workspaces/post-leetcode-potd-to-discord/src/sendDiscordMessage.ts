import { ChannelType, Client, GatewayIntentBits } from "discord.js";
import invariant from "invariant";

import type { Secrets } from "./readSecrets.ts";

export async function sendDiscordMessage(
  { discordChannelID, discordToken }: Secrets,
  content: string,
): Promise<void> {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(discordToken);

    const channel = await client.channels.fetch(discordChannelID);
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
