import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

export async function runWebpack(): Promise<void> {
  console.log("ENV with bash");
  await spawnWithSafeStdio("env", [], { shell: "bash" });
  console.log("ENV without bash");
  await spawnWithSafeStdio("env", []);
  console.log();
  console.log();

  await spawnWithSafeStdio("webpack", ["--color"], { shell: "bash" });
}
