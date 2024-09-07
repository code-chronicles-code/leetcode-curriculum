function* lazyFilter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): Generator<T, void, void> {
  for (const [index, element] of arr.entries()) {
    fn(element, index) && (yield element);
  }
}

const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] => Array.from(lazyFilter(arr, fn));
