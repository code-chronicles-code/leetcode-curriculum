function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = () => {
    if (res.length === arr.length) {
      return;
    }

    res.push(fn(arr[res.length], res.length));
    doMap();
  };

  doMap();

  return res;
}
