import invariant from "invariant";

import { isString } from "@code-chronicles/util/isString";

export function assertIsString(value: unknown): string {
  invariant(isString(value), "Got non-string!");
  return value;
}
