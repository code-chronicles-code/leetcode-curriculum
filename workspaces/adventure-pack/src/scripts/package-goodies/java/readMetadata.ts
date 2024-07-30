import fsPromises from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

import { GOODIES_DIRECTORY } from "./constants";

const metadataParser = z
  .object({
    name: z.string().regex(/^\S/).regex(/\S$/),
  })
  .strict();

type Metadata = z.infer<typeof metadataParser>;

export async function readMetadata(packageName: string): Promise<Metadata> {
  const text = await fsPromises.readFile(
    path.join(GOODIES_DIRECTORY, packageName, "goody.json"),
    "utf8",
  );

  return metadataParser.parse(JSON.parse(text));
}
