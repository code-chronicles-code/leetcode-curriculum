function filter<T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] {
  const res: T[] = [];

  const doFilter = (index: number) => {
    if (index === arr.length) {
      return;
    }

    const element = arr[index];
    fn(element, index) && res.push(element);
    doFilter(index + 1);
  };

  doFilter(0);

  return res;
}
