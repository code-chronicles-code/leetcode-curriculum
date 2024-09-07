function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
  index: number = 0,
  res: T[] = [],
): T[] {
  if (index === arr.length) {
    return res;
  }

  const element = arr[index];
  fn(element, index) && res.push(element);
  return filter(arr, fn, index + 1, res);
}
