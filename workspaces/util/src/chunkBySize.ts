export function* chunkBySize<T>(
  array: readonly T[],
  chunkSize: number,
): Generator<T[], void, void> {
  if (chunkSize < 1 || !Number.isInteger(chunkSize)) {
    throw new Error("Chunk size must be a positive integer!");
  }

  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}
