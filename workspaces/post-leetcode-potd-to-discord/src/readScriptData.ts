import fsPromises from "node:fs/promises";

import { z } from "zod";

import { isSystemError } from "@code-chronicles/util/isSystemError";

const DATA_FILE = "data.json";

const dataZodType = z.object({
  lastPostedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export type Data = z.infer<typeof dataZodType>;

export async function readScriptData(): Promise<Data> {
  try {
    return dataZodType.parse(
      JSON.parse(await fsPromises.readFile(DATA_FILE, "utf8")),
    );
  } catch (err) {
    if (isSystemError(err) && err.code === "ENOENT") {
      return {};
    }

    console.error(err);
    throw err;
  }
}

// TODO: move to another file?
export async function writeScriptData(data: Data): Promise<void> {
  await fsPromises.writeFile(DATA_FILE, JSON.stringify(data), {
    encoding: "utf8",
  });
}
