const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
  index: number = 0,
): TResult =>
  index === arr.length
    ? init
    : reduce(arr, fn, fn(init, arr[index]), index + 1);
