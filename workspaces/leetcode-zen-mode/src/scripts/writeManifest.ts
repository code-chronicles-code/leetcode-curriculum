import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import packageJson from "../../package.json" with { type: "json" };

// TODO: figure out a way to reuse this in webpack and eslint configs
const DIST_DIRECTORY = "dist";

async function main(): Promise<void> {
  await mkdir(DIST_DIRECTORY, { recursive: true });

  await writeFile(
    path.join(DIST_DIRECTORY, "manifest.json"),
    JSON.stringify(
      {
        name: "LeetCode Zen Mode",
        description: packageJson.description,
        version: packageJson.version,

        // eslint-disable-next-line camelcase
        manifest_version: 3,
        // eslint-disable-next-line camelcase
        content_scripts: [
          {
            matches: ["https://*.leetcode.com/*"],
            // TODO: share this constant with webpack
            js: ["main.js"],
            // eslint-disable-next-line camelcase
            run_at: "document_start",
            world: "MAIN",
          },
        ],
      },
      // TODO: prettify or not based on NODE_ENV
      null,
      2,
    ) + "\n",
    { encoding: "utf8" },
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
