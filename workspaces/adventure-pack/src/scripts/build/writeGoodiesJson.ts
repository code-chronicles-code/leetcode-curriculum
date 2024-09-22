import { writeFile } from "node:fs/promises";
import path from "node:path";

import { jsonStringifyPrettyInDev } from "@code-chronicles/util/jsonStringifyPrettyInDev";

import { readAllGoodies } from "../package-goodies/readAllGoodies.ts";
import { WEB_APP_DIST } from "./constants.ts";

export async function writeGoodiesJson(): Promise<void> {
  const goodies = await readAllGoodies();

  // TODO: share the filenames via some constants
  await writeFile(
    path.join(WEB_APP_DIST, "goodies.json"),
    jsonStringifyPrettyInDev(goodies),
    { encoding: "utf8" },
  );
}
