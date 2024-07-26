import invariant from "invariant";

export function firstOrThrow<T>(array: readonly T[]): T {
  invariant(array.length > 0, "Expected a non-empty array!");
  return array[0];
}
