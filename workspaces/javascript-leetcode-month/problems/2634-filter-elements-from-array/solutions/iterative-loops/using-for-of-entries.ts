function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  for (const [index, element] of arr.entries()) {
    fn(element, index) && res.push(element);
  }

  return res;
}
