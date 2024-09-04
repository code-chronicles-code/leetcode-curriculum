function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  arr.forEach((element, index) => {
    res.push(fn(element, index));
  });

  return res;
}
