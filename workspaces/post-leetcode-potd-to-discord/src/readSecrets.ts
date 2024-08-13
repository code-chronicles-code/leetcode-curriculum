import { readFile } from "node:fs/promises";

import { z } from "zod";

import { numericIdAsStringZodType } from "@code-chronicles/util/numericIdAsStringZodType";

const SECRETS_FILE = "secrets_DO_NOT_COMMIT_OR_SHARE.json";

const secretsZodType = z.object({
  discordChannelID: numericIdAsStringZodType,
  discordToken: z.string().min(1),
});

export type Secrets = z.infer<typeof secretsZodType>;

export async function readSecrets(): Promise<Secrets> {
  return secretsZodType.parse(JSON.parse(await readFile(SECRETS_FILE, "utf8")));
}
