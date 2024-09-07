const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => arr.map(fn);
