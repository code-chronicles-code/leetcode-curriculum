const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => [...arr].reverse().reduceRight(fn, init);
