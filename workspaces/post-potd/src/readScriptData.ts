import fsPromises from "node:fs/promises";
import { z } from "zod";

const DATA_FILE = "data.json";

const dataParser = z.object({
  lastPostedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

export type Data = z.infer<typeof dataParser>;

export async function readScriptData(): Promise<Data> {
  try {
    return dataParser.parse(
      JSON.parse(await fsPromises.readFile(DATA_FILE, "utf8")),
    );
  } catch (err) {
    if ((err as Record<string, unknown>)["code"] === "ENOENT") {
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
