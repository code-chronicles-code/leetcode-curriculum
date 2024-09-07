function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  for (let i = 0; i < arr.length; ++i) {
    const element = arr[i];
    fn(element, i) && res.push(element);
  }

  return res;
}
