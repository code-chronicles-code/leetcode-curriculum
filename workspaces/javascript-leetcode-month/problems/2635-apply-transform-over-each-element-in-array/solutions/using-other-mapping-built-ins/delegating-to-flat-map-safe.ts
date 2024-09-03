const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] => arr.flatMap((element, index) => [fn(element, index)]);
