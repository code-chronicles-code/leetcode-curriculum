function chunk<T>(arr: readonly T[], size: number): T[][] {
  const res: T[][] = [];

  arr.forEach((element, index) => {
    // New chunks start at indexes divisible by `size`.
    if (index % size === 0) {
      res.push([]);
    }

    res.at(-1)!.push(element);
  });

  return res;
}
