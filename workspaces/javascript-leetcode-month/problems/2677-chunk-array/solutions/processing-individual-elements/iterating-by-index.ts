function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; ++i) {
    // New chunks start at indexes divisible by `size`.
    if (i % size === 0) {
      res.push([]);
    }

    // We can be certain that `res` is not empty because we'll add something
    // to `res` during the very first iteration, when `i` is 0.
    const lastChunk = res.at(-1)!;
    lastChunk.push(arr[i]);
  }

  return res;
}
