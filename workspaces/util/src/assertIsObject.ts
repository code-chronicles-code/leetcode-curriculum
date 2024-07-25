import invariant from "invariant";

import { isObject } from "@code-chronicles/util/isObject";

export function assertIsObject(value: unknown): Record<PropertyKey, unknown> {
  invariant(isObject(value), "Got non-object!");
  return value;
}
