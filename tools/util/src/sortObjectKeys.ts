export function sortObjectKeys<TKey extends string | symbol | number, TVal>(
  obj: Readonly<Record<TKey, TVal>>,
  compareFn: (a: TKey, b: TKey) => number = (a: unknown, b: unknown): number =>
    String(a).localeCompare(String(b)),
): Record<TKey, TVal> {
  const res = {} as Record<TKey, TVal>;
  for (const key of (Object.keys(obj) as TKey[]).sort(compareFn)) {
    res[key] = obj[key];
  }
  return res;
}
