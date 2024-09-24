import type { JsonObject } from "type-fest";

import { SCRIPT_FILENAME } from "./constants.ts";
import packageJson from "../../package.json" with { type: "json" };

export function getManifest(): JsonObject {
  return {
    name: "LeetCode Zen Mode",
    description: packageJson.description,
    version: packageJson.version,

    // eslint-disable-next-line camelcase
    manifest_version: 3,
    // eslint-disable-next-line camelcase
    content_scripts: [
      {
        matches: ["https://*.leetcode.com/*"],
        js: [SCRIPT_FILENAME],
        // eslint-disable-next-line camelcase
        run_at: "document_start",
        world: "MAIN",
      },
    ],
  };
}
