function reduce<TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult {
  let res = init;

  arr.reverse();
  while (arr.length > 0) {
    res = fn(res, arr.pop() as TElement);
  }

  return res;
}
