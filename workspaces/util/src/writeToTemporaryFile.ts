import { writeFile } from "node:fs/promises";

import { createTemporaryFile } from "@code-chronicles/util/createTemporaryFile";

export async function writeToTemporaryFile(
  data: Parameters<typeof writeFile>[1],
  options?: Parameters<typeof writeFile>[2],
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {},
): Promise<string> {
  let fh, filename;
  try {
    [filename, fh] = await createTemporaryFile(prefix, suffix);
    await writeFile(fh, data, options);
    return filename;
  } finally {
    fh && (await fh.close());
  }
}
