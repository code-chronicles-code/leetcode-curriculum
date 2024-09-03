function* lazyMap<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): Generator<TOut, void, void> {
  for (const [index, element] of arr.entries()) {
    yield fn(element, index);
  }
}

const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => Array.from(lazyMap(arr, fn));
