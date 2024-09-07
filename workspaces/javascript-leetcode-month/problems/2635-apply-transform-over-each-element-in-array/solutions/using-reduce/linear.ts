const map = <TIn, TOut>(
  arr: readonly TIn[],
  fn: (element: TIn, index: number) => TOut,
): TOut[] =>
  arr.reduce((res: TOut[], element, index) => {
    res.push(fn(element, index));
    return res;
  }, []);
