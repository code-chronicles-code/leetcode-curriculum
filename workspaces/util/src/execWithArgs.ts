import { spawn, type SpawnOptions } from "node:child_process";
import type { Readable } from "node:stream";

import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";

type ExecWithArgsResult = {
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

async function slurpReadable(readable: Readable): Promise<string> {
  const data = await readable.toArray();
  return Buffer.concat(data.map(Buffer.from)).toString("utf8");
}
