// TODO: keep in sync with `Map.groupBy` goody

export function groupBy<K, V>(
  iterable: Iterable<V>,
  callbackFn: (value: V, index: number) => K,
): Map<K, V[]> {
  const groups = new Map<K, V[]>();

  let index = 0;
  for (const value of iterable) {
    const key = callbackFn(value, index++);
    const group = groups.get(key);
    if (group == null) {
      groups.set(key, [value]);
    } else {
      group.push(value);
    }
  }

  return groups;
}
