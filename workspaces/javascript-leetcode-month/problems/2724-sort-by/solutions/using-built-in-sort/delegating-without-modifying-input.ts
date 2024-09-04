const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  [...arr].sort((a, b) => fn(a) - fn(b));
