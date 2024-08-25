import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

export async function runWebpack(): Promise<void> {
  console.log("which with bash");
  await spawnWithSafeStdio("which", ["-a", "yarn"], { shell: "bash" });
  console.log("which without bash");
  await spawnWithSafeStdio("which", ["-a", "yarn"]);
  console.log();
  console.log();

  await spawnWithSafeStdio("webpack", ["--color"], { shell: "bash" });
}
