export function objectFromKeys<TKey extends PropertyKey, TVal>(
  keys: readonly TKey[],
  valueFactory: (key: TKey) => TVal,
): Record<TKey, TVal> {
  const res = {} as Record<TKey, TVal>;
  for (const key of keys) {
    res[key] = valueFactory(key);
  }
  return res;
}
