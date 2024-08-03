import process from "node:process";

import { isStringAWayOfSayingFalse } from "@code-chronicles/util/isStringAWayOfSayingFalse";

export function isRunningInCI(): boolean {
  const ciEnv = process.env.CI;
  return ciEnv != null && !isStringAWayOfSayingFalse(ciEnv);
}
