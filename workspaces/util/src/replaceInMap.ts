import invariant from "invariant";

export function replaceInMap<TKey, TValue>(
  map: Map<TKey, TValue>,
  key: TKey,
  mapFn: (oldValue: TValue) => TValue,
): void {
  invariant(map.has(key), "Key not present in the map: " + key);
  map.set(key, mapFn(map.get(key) as TValue));
}
