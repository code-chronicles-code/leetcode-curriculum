import { writeFile } from "node:fs/promises";

import { DATA_FILE, type Data } from "./readScriptData";

export async function writeScriptData(data: Data): Promise<void> {
  await writeFile(DATA_FILE, JSON.stringify(data), {
    encoding: "utf8",
  });
}
