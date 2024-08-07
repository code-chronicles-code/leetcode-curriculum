import fsPromises from "node:fs/promises";

import { z } from "zod";

const SECRETS_FILE = "secrets_DO_NOT_COMMIT_OR_SHARE.json";

const secretsZodType = z.object({
  leetcodeSessionCookie: z.string().min(1),
});

export type Secrets = z.infer<typeof secretsZodType>;

export async function readSecrets(): Promise<Secrets> {
  return secretsZodType.parse(
    JSON.parse(await fsPromises.readFile(SECRETS_FILE, "utf8")),
  );
}
