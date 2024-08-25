import { writeFile } from "node:fs/promises";
import path from "node:path";

import prettier from "prettier";

import { isEnvironmentDev } from "@code-chronicles/util/isEnvironmentDev";

import { readAllGoodies } from "../package-goodies/readAllGoodies";
import { WEB_APP_DIST } from "./constants";

async function readAllGoodiesAsString(): Promise<string> {
  const goodies = await readAllGoodies();
  const text = JSON.stringify(goodies);

  if (isEnvironmentDev()) {
    // Could also change the arguments to `JSON.stringify` but thought we
    // could give Prettier the chance to do something fancier.
    return await prettier.format(text, { parser: "json" });
  }

  return text + "\n";
}

export async function writeGoodiesJson(): Promise<void> {
  const text = await readAllGoodiesAsString();

  await writeFile(path.join(WEB_APP_DIST, "goodies.json"), text, {
    encoding: "utf8",
  });
}
