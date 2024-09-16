import process from "node:process";

import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";
import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

export async function runWebpack(): Promise<void> {
  await spawnWithSafeStdio("webpack", ["--color"], {
    env: {
      ...process.env,
      NODE_OPTIONS: ["--import tsx", process.env.NODE_OPTIONS ?? ""]
        .filter((opt) => !isStringEmptyOrWhitespaceOnly(opt))
        .join(" "),
    },
  });
}
