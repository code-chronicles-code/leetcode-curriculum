declare global {
  interface ObjectConstructor {
    setUnsafe(
      obj: unknown,
      properties: readonly [string, ...string[]],
      value: unknown,
    ): void;
  }
}

Object.setUnsafe = function (
  obj: unknown,
  properties: readonly [string, ...string[]],
  value: unknown,
): void {
  let map = obj;
  for (let i = 0; i < properties.length - 1; ++i) {
    map = (map as Record<string, unknown>)[properties[i]] ??= {};
  }
  (map as Record<string, unknown>)[properties.at(-1)!] = value;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
