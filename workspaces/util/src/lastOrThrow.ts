import invariant from "invariant";

export function lastOrThrow<T>(array: readonly T[]): T {
  invariant(array.length > 0, "Expected a non-empty array!");
  return array.at(-1) as T;
}
