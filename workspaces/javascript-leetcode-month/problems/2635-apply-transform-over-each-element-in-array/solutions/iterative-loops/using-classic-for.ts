function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  for (let i = 0; i < arr.length; ++i) {
    res.push(fn(arr[i], i));
  }

  return res;
}
