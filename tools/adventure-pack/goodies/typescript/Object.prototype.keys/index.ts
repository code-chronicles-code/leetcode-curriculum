declare global {
  interface Object {
    keys<T extends {}>(this: T): Generator<keyof T, void, void>;
  }
}

Object.prototype.keys = function* <T extends {}>(
  this: T,
): Generator<keyof T, void, void> {
  for (const key in this) {
    if (Object.hasOwn(this, key)) {
      yield key;
    }
  }
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
