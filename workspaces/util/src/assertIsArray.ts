import invariant from "invariant";

export function assertIsArray(value: unknown): unknown[] {
  invariant(Array.isArray(value), "Got non-array!");
  return value;
}
