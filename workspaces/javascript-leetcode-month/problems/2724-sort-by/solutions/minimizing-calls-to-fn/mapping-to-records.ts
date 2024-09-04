const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr
    .map((element) => ({ element, sortKey: fn(element) }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ element }) => element);
