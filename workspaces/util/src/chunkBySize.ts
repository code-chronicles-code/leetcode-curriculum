export function* chunkBySize<T>(
  array: readonly T[],
  chunkSize: number,
): Generator<T[], void, void> {
  if (
    typeof chunkSize !== "number" ||
    chunkSize < 1 ||
    !Number.isInteger(chunkSize)
  ) {
    throw new RangeError("Chunk size must be a positive integer!");
  }

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);

    for (const item of chunk) {
      if (item === undefined) {
        throw new TypeError("Array elements cannot be undefined!");
      }
    }

    yield chunk;
  }
}
