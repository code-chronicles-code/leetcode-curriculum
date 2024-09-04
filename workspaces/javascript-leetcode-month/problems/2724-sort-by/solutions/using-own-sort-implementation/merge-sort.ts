function sortBy<T>(arr: readonly T[], fn: (value: T) => number): T[] {
  const n = arr.length;
  if (n <= 1) {
    return [...arr];
  }

  const middleIndex = Math.floor(n / 2);
  const firstHalf = sortBy(arr.slice(0, middleIndex), fn);
  const secondHalf = sortBy(arr.slice(middleIndex), fn);

  const res: T[] = [];

  let firstHalfCursor = 0;
  let secondHalfCursor = 0;
  while (
    firstHalfCursor < firstHalf.length &&
    secondHalfCursor < secondHalf.length
  ) {
    res.push(
      fn(firstHalf[firstHalfCursor]) <= fn(secondHalf[secondHalfCursor])
        ? firstHalf[firstHalfCursor++]
        : secondHalf[secondHalfCursor++],
    );
  }
  res.push(
    ...firstHalf.slice(firstHalfCursor),
    ...secondHalf.slice(secondHalfCursor),
  );

  return res;
}
