const reduce = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult =>
  arr.length === 0 ? init : reduce(arr, fn, fn(init, arr.shift() as TElement));
