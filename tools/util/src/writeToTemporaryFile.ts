import fsPromises from "node:fs/promises";

import { createTemporaryFile } from "./createTemporaryFile";

export async function writeToTemporaryFile(
  data: Parameters<typeof fsPromises.writeFile>[1],
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {},
): Promise<string> {
  let fh, filename;
  try {
    [filename, fh] = await createTemporaryFile(prefix, suffix);
    await fsPromises.writeFile(fh, data);
    return filename;
  } finally {
    fh && (await fh.close());
  }
}
