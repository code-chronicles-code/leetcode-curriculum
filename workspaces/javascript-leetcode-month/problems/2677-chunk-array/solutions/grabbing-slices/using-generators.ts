function* generateSlice<T>(
  arr: readonly T[],
  start: number,
  size: number,
): Generator<T, void, void> {
  for (let i = start; size > 0 && i < arr.length; ++i, --size) {
    yield arr[i];
  }
}

function* generateChunks<T>(
  arr: readonly T[],
  size: number,
): Generator<T[], void, void> {
  for (let i = 0; i < arr.length; i += size) {
    yield Array.from(generateSlice(arr, i, size));
  }
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  return Array.from(generateChunks(arr, size));
}
