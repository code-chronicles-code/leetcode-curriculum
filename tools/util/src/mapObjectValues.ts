export function mapObjectValues<TKey extends PropertyKey, TVal, TOut>(
  obj: Readonly<Record<TKey, TVal>>,
  mapFn: (value: TVal, key: TKey) => TOut,
): Record<TKey, TOut> {
  const res = {} as Record<TKey, TOut>;

  for (const [key, val] of Object.entries(
    obj as unknown as Record<TKey, TVal>,
  ) as [TKey, TVal][]) {
    res[key] = mapFn(val, key);
  }

  return res;
}
