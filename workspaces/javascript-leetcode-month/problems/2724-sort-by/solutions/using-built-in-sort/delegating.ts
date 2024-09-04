const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
  arr.sort((a, b) => fn(a) - fn(b));
