function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  for (const element of arr) {
    // If there's no last chunk, or if the last chunk is full, start a new
    // chunk.
    if (res.length === 0 || res.at(-1)!.length === size) {
      res.push([]);
    }

    res.at(-1)!.push(element);
  }

  return res;
}
