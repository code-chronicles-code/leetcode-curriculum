import type { Readable } from "node:stream";

export async function slurpReadable(readable: Readable): Promise<string> {
  const data = await readable.toArray();
  return Buffer.concat(data.map(Buffer.from)).toString("utf8");
}
