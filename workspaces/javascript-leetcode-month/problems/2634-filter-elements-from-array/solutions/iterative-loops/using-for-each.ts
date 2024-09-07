function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  arr.forEach((element, index) => {
    fn(element, index) && res.push(element);
  });

  return res;
}
