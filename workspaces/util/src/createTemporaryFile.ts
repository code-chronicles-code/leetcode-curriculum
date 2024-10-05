import { constants } from "node:fs";
import { open as openFile, type FileHandle } from "node:fs/promises";

import { getRandomBytes } from "@code-chronicles/util/getRandomBytes";
import { isSystemError } from "@code-chronicles/util/isSystemError";

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
        await openFile(
          filename,
          constants.O_CREAT | constants.O_RDWR | constants.O_EXCL,
        ),
      ];
    } catch (e) {
      try {
        // We won the lottery and came up with a temporary file name that
        // already exists. Try again?
        if (isSystemError(e) && e.code === "EEXIST") {
          continue;
        }
      } catch {}

      throw e;
    }
  }
}
