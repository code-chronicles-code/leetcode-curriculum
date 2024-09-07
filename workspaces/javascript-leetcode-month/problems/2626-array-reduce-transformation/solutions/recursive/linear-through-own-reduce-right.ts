const reduceRight = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult =>
  arr.length === 0
    ? init
    : reduceRight(arr, fn, fn(init, arr.pop() as TElement));

const reduce = <TElement, TResult>(
  arr: TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => reduceRight(arr.reverse(), fn, init);
