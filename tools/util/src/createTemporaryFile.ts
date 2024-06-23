import { constants } from "node:fs";
import fsPromises, { type FileHandle } from "node:fs/promises";

import { getRandomBytes } from "./getRandomBytes";

export async function createTemporaryFile(
  prefix: string = "",
  suffix: string = "",
): Promise<[string, FileHandle]> {
  // TODO: Maybe do set some limit.
  while (true) {
    try {
      const filename = [
        prefix,
        // eslint-disable-next-line no-await-in-loop
        (await getRandomBytes(16)).toString("hex"),
        suffix,
      ].join("");

      return [
        filename,
        // eslint-disable-next-line no-await-in-loop
        await fsPromises.open(
          filename,
          constants.O_CREAT | constants.O_RDWR | constants.O_EXCL,
        ),
      ];
    } catch (e) {
      try {
        // We won the lottery and came up with a temporary file name that
        // already exists. Try again?
        if ((e as { code: string }).code === "EEXIST") {
          continue;
        }
      } catch {}

      throw e;
    }
  }
}
