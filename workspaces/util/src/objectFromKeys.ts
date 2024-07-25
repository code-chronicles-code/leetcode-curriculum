export function objectFromKeys<TKey extends PropertyKey, TVal>(
  keys: readonly TKey[],
  valueFactory: () => TVal,
): Record<TKey, TVal> {
  const res = {} as Record<TKey, TVal>;
  for (const key of keys) {
    res[key] = valueFactory();
  }
  return res;
}
