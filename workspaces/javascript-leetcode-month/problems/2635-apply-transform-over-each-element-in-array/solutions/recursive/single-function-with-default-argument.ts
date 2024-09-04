function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
  res: TOut[] = [],
): TOut[] {
  if (res.length === arr.length) {
    return res;
  }

  res.push(fn(arr[res.length], res.length));
  return map(arr, fn, res);
}
