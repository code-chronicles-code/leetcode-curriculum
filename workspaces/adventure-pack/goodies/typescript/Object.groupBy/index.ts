declare global {
  interface ObjectConstructor {
    groupBy<V>(
      iterable: Iterable<V>,
      callbackFn: (value: V, index: number) => string,
    ): Partial<Record<string, V[]>>;
  }
}

Object.groupBy ??= function <V>(
  iterable: Iterable<V>,
  callbackFn: (value: V, index: number) => string,
): Partial<Record<string, V[]>> {
  const groups: Partial<Record<string, V[]>> = {};

  let index = 0;
  for (const value of iterable) {
    const key = callbackFn(value, index++);
    (groups[key] ??= []).push(value);
  }

  return groups;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
