const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.reduce(
    (res: T[], element, index) => (
      fn(element, index) && res.push(element), res
    ),
    [],
  );
