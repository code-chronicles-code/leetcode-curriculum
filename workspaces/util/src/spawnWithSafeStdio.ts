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

      // Without a shell specified, many comands seem to fail to spawn on
      // Windows. I verified that it's not a PATH issue. It seems like it's
      // probably https://github.com/nodejs/node-v0.x-archive/issues/5841
      ...(process.platform === "win32" && { shell: options?.shell ?? "bash" }),

      // When using "inherit" mode, it sometimes broke the interaction with
      // the actions/github-script@v7 GitHub Action...
      stdio: ["ignore", "pipe", "pipe"],
    });

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
