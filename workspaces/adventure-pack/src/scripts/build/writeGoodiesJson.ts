import { writeFile } from "node:fs/promises";
import path from "node:path";

import { readAllGoodies } from "../package-goodies/readAllGoodies";
import { WEBAPP_DIST } from "./constants";

export async function writeGoodiesJson(): Promise<void> {
  const goodies = await readAllGoodies();

  await writeFile(
    path.join(WEBAPP_DIST, "goodies.json"),
    // TODO: pretty print if NODE_ENV is "development"
    JSON.stringify(goodies) + "\n",
  );
}
