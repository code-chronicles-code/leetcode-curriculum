import type { SpawnOptions } from "node:child_process";

import { spawnWithSafeStdio } from "@code-chronicles/util/spawnWithSafeStdio";

import { reportCommand } from "./reportCommand.ts";

export function reportCommandAndSpawn(
  command: string,
  args: readonly string[],
  options?: SpawnOptions,
): Promise<void> {
  reportCommand(command, args);
  return spawnWithSafeStdio(command, args, options);
}
