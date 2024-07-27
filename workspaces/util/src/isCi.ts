import process from "node:process";

import { isString } from "@code-chronicles/util/isString";

const FALSY_VALUES = new Set(["", "0", "false", "no", "off"]);

export function isCi(): boolean {
  const ciEnv = process.env.CI;
  return isString(ciEnv) && !FALSY_VALUES.has(ciEnv.trim().toLowerCase());
}
