import invariant from "invariant";

export function only<T>(array: readonly T[]): T {
  invariant(array.length === 1, "Expected a single element array!");
  return array[0];
}
