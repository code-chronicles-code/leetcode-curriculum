declare global {
  interface Array<T> {
    toSorted(this: T[], compareFn: (a: T, b: T) => number): T[];
  }

  interface ReadonlyArray<T> {
    toSorted(this: readonly T[], compareFn: (a: T, b: T) => number): T[];
  }
}

const sortBy = <T>(arr: readonly T[], fn: (value: T) => number): T[] =>
  arr.toSorted((a, b) => fn(a) - fn(b));
