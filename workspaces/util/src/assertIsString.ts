import invariant from "invariant";

export function assertIsString(value: unknown): string {
  invariant(typeof value === "string", "Got non-string!");
  return value;
}
