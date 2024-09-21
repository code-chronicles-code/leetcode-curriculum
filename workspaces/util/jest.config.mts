import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;

// Hack to make this config runnable as a script, since the combination of
// Jest, ESM, and a TypeScript config has been painful to get working otherwise.
import("node:process").then(async ({ default: process }) => {
  if (import.meta.filename !== process.argv[1]) {
    return;
  }

  try {
    const { spawnWithSafeStdio } = await import(
      "@code-chronicles/util/spawnWithSafeStdio"
    );
    await spawnWithSafeStdio(
      "jest",
      ["--color", "-c", JSON.stringify(config), ...process.argv.slice(2)],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          NODE_OPTIONS: [
            "--experimental-vm-modules",
            process.env.NODE_OPTIONS?.trim(),
          ]
            .filter(Boolean)
            .join(" "),
        },
      },
    );
  } catch (err) {
    console.error(
      (err as Record<string, unknown> | null | undefined)?.message ?? err,
    );
    // eslint-disable-next-line require-atomic-updates -- Updating `process.exitCode` on error is logical.
    process.exitCode = 1;
  }
});
