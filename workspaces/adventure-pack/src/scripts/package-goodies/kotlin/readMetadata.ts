import fsPromises from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import { GOODIES_DIRECTORY } from "./constants.ts";

const metadataZodType = z
  .object({
    name: z.string().regex(/^\S/).regex(/\S$/),
  })
  .strict();

type Metadata = z.infer<typeof metadataZodType>;

export async function readMetadata(packageName: string): Promise<Metadata> {
  const text = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, "goody.json"),
    "utf8",
  );

  return metadataZodType.parse(JSON.parse(text));
}
