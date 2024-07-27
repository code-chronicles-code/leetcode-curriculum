export function* chunkBySize<T>(
  array: readonly T[],
  chunkSize: number,
): Generator<T[], void, void> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}
