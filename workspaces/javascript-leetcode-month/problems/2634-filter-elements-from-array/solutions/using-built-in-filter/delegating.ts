const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] => arr.filter(fn);
