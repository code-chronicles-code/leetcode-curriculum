import process from "node:process";
import { spawn, type SpawnOptions } from "node:child_process";

export function spawnWithSafeStdio(
  command: string,
  args: readonly string[],
  options?: Omit<SpawnOptions, "stdio">,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      ...options,
      stdio: ["ignore", "pipe", "pipe"],
    });

    // When using "inherit" mode, this sometimes broke the interaction with
    // the actions/github-script@v7 GitHub Action...
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on("error", reject);
    childProcess.on("exit", (exitCode) => {
      if (exitCode) {
        reject(new Error(`Non-zero exit code ${exitCode}.`));
      } else {
        resolve();
      }
    });
  });
}
