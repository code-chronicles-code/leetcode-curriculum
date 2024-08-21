export function* chunkBySize<T>(
  array: readonly T[] | null | undefined,
  chunkSize: number,
): Generator<T[], void, void> {
  if (chunkSize < 1 || !Number.isInteger(chunkSize)) {
    throw new RangeError("Chunk size must be a positive integer!");
  }

  if (array === null || array === undefined) {
    throw new TypeError("Array cannot be null or undefined!");
  }

  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}
