const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr.flatMap((element, index) => (fn(element, index) ? [element] : []));
