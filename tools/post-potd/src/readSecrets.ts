import fsPromises from "node:fs/promises";
import { z } from "zod";

const SECRETS_FILE = "secrets_DO_NOT_COMMIT_OR_SHARE.json";

const secretsParser = z.object({
  discordChannelID: z.string().regex(/^\d+$/),
  discordToken: z.string().min(1),
});

export type Secrets = z.infer<typeof secretsParser>;

export async function readSecrets(): Promise<Secrets> {
  return secretsParser.parse(
    JSON.parse(await fsPromises.readFile(SECRETS_FILE, "utf8")),
  );
}
