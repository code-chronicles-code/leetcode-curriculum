function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  const doReduce = (accumulator: TResult, index: number): TResult =>
    index === arr.length
      ? accumulator
      : doReduce(fn(accumulator, arr[index]), index + 1);

  return doReduce(init, 0);
}
