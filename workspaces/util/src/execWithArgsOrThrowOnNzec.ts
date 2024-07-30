import type { SpawnOptions } from "node:child_process";

import {
  type ExecWithArgsResult,
  execWithArgs,
} from "@code-chronicles/util/execWithArgs";

export async function execWithArgsOrThrowOnNzec(
  command: string,
  args: readonly string[],
  {
    fallbackNzecErrorMessage,
    ...options
  }: Omit<SpawnOptions, "stdio"> & { fallbackNzecErrorMessage?: string } = {
    fallbackNzecErrorMessage: "Non-zero exit code!",
  },
): Promise<Omit<ExecWithArgsResult, "exitCode">> {
  const { exitCode, ...result } = await execWithArgs(command, args, options);
  if (exitCode !== 0) {
    throw new Error(result.stderr.trim() || fallbackNzecErrorMessage);
  }

  return result;
}
