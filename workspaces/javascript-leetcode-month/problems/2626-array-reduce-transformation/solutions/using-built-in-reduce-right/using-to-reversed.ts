declare global {
  interface Array<T> {
    toReversed(this: T[]): T[];
  }

  interface ReadonlyArray<T> {
    toReversed(this: readonly T[]): T[];
  }
}

const reduce = <TElement, TResult>(
  arr: readonly TElement[],
  fn: (accumulator: TResult, element: TElement) => TResult,
  init: TResult,
): TResult => arr.toReversed().reduceRight(fn, init);
