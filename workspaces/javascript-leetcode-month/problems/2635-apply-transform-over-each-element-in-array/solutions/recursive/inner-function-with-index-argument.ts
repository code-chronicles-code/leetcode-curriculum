function map<TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] {
  const res: TOut[] = [];

  const doMap = (index: number) => {
    if (index === arr.length) {
      return;
    }

    res.push(fn(arr[index], index));
    doMap(index + 1);
  };

  doMap(0);

  return res;
}
