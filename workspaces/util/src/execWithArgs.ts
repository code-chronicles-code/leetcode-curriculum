import { spawn, type SpawnOptions } from "node:child_process";

import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";
import { slurpReadable } from "@code-chronicles/util/slurpReadable";

export type ExecWithArgsResult = {
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
};

export function execWithArgs(
  command: string,
  args: readonly string[],
  options?: Omit<SpawnOptions, "stdio">,
): Promise<ExecWithArgsResult> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      // TODO: share code between this callsite and spawnWithSafeStdio

      // Without a shell specified, many comands seem to fail to spawn on
      // Windows. I verified that it's not a PATH issue. It seems like it's
      // probably https://github.com/nodejs/node-v0.x-archive/issues/5841
      ...(process.platform === "win32" && {
        shell: "bash",
        windowsVerbatimArguments: true,
      }),

      ...options,

      stdio: ["ignore", "pipe", "pipe"],
    });

    // Setting up the promise here, since waiting until the process exits
    // means the streams may get closed before they ever flow.
    const output = promiseAllObject({
      stderr: slurpReadable(childProcess.stderr),
      stdout: slurpReadable(childProcess.stdout),
    });

    childProcess.on("error", reject);
    childProcess.on("exit", async (exitCode, signal) =>
      resolve({ exitCode, signal, ...(await output) }),
    );
  });
}
