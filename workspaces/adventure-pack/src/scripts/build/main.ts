import { mkdir } from "node:fs/promises";

import { WEBAPP_DIST } from "./constants";
import { runWebpack } from "./runWebpack";
import { writeGoodiesJson } from "./writeGoodiesJson";
import { writeIndexHtml } from "./writeIndexHtml";
import { writeStyleCss } from "./writeStyleCss";

// TODO: Investigate why this script works with `tsx` but not `ts-node`.

async function main(): Promise<void> {
  await mkdir(WEBAPP_DIST, { recursive: true });

  await Promise.all([
    runWebpack(),
    writeIndexHtml(),
    writeGoodiesJson(),
    writeStyleCss(),
  ]);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
