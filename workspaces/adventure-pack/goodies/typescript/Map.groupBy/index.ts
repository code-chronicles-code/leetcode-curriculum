declare global {
  interface MapConstructor {
    groupBy<K, V>(
      iterable: Iterable<V>,
      callbackFn: (value: V, index: number) => K,
    ): Map<K, V[]>;
  }
}

Map.groupBy = function <K, V>(
  iterable: Iterable<V>,
  callbackFn: (value: V, index: number) => K,
): Map<K, V[]> {
  const groups = new Map<K, V[]>();
  let index = 0;
  for (const value of iterable) {
    const key = callbackFn(value, index);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(value);
    index++;
  }
  return groups;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
