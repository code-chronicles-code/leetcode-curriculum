import invariant from "invariant";

export function lastOrThrow<T>(array: readonly T[]): T {
  invariant(array.length > 0, "Expected a non-empty array!");

  // The cast is safe because we checked the size of the array.
  // Not using `nullthrows` because `T` could be a union that includes
  // `null` or `undefined`.
  return array.at(-1) as T;
}
