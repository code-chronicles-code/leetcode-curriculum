const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element): [T, number] => [element, fn(element)])
    .sort((a, b) => a[1] - b[1])
    .map(([element]) => element);
