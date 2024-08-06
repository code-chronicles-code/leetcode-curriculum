import fsPromises from "node:fs/promises";

import { z } from "zod";

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
    // TODO: utility for this
    if ((err as Record<string, unknown>).code === "ENOENT") {
      return {};
    }

    console.error(err);
    throw err;
  }
}

export async function writeScriptData(data: Data): Promise<void> {
  await fsPromises.writeFile(DATA_FILE, JSON.stringify(data), {
    encoding: "utf8",
  });
}
