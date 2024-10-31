import { mkdir } from "node:fs/promises";

import { WEB_APP_DIST } from "./constants.ts";
import { runWebpack } from "./runWebpack.ts";
import { writeGoodiesJson } from "./writeGoodiesJson.ts";
import { writeStyleCss } from "./writeStyleCss.ts";

async function main(): Promise<void> {
  await mkdir(WEB_APP_DIST, { recursive: true });

  await Promise.all([runWebpack(), writeGoodiesJson(), writeStyleCss()]);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
