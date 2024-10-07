export function filterMapValues<TKey, TValue, TFilteredValue extends TValue>(
  map: ReadonlyMap<TKey, TValue>,
  predicate: (value: TValue, key: TKey) => value is TFilteredValue,
): Map<TKey, TFilteredValue>;
export function filterMapValues<TKey, TValue>(
  map: ReadonlyMap<TKey, TValue>,
  predicate: (value: TValue, key: TKey) => unknown,
): Map<TKey, TValue>;
export function filterMapValues<TKey, TValue>(
  map: ReadonlyMap<TKey, TValue>,
  predicate: (value: TValue, key: TKey) => unknown,
): Map<TKey, TValue> {
  const res = new Map();
  for (const [key, val] of map.entries()) {
    if (predicate(val, key)) {
      res.set(key, val);
    }
  }

  return res;
}
