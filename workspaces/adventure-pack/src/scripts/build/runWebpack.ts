import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

export async function runWebpack(): Promise<void> {
  await spawnWithSafeStdio("webpack", ["--color"]);
}
