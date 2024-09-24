import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { jsonStringifyPrettyInDev } from "@code-chronicles/util/jsonStringifyPrettyInDev";

import { DIST_DIRECTORY } from "./constants.ts";
import { getManifest } from "./getManifest.ts";

async function main(): Promise<void> {
  await mkdir(DIST_DIRECTORY, { recursive: true });

  const manifest = getManifest();

  await writeFile(
    path.join(DIST_DIRECTORY, "manifest.json"),
    jsonStringifyPrettyInDev(manifest),
    { encoding: "utf8" },
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
