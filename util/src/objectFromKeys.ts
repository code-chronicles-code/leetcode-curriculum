export function objectFromKeys<T>(
  keys: readonly string[],
  valueFactory: () => T,
): Record<string, T> {
  const res = {} as Record<string, T>;
  for (const key of keys) {
    res[key] = valueFactory();
  }
  return res;
}
