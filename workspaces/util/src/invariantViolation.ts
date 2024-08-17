import invariant from "invariant";

export function invariantViolation(format: string, ...extra: unknown[]): never {
  invariant(false, format, ...extra);
}
