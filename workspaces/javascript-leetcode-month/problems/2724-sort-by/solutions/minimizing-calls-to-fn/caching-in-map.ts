function sortBy<T>(arr: readonly T[], fn: (value: T) => number): T[] {
  const cache = new Map<T, number>();
  const getSortKey = (value: T): number => {
    let res = cache.get(value);
    if (res == null) {
      res = fn(value);
      cache.set(value, res);
    }
    return res;
  };

  return [...arr].sort((a, b) => getSortKey(a) - getSortKey(b));
}
