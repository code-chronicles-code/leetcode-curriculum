function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  for (const [index, element] of arr.entries()) {
    res.push(fn(element, index));
  }

  return res;
}
