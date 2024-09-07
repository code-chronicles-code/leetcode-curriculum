function reduce<TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  for (const element of arr) {
    res = fn(res, element);
  }

  return res;
}
