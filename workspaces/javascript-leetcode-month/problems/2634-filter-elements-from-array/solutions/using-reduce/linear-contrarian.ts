const filter = <T>(
  arr: readonly T[],
  fn: (element: T, index: number) => unknown,
): T[] =>
  arr
    .reduceRight((res: T[], element, index) => {
      fn(element, index) && res.push(element);
      return res;
    }, [])
    .reverse();
