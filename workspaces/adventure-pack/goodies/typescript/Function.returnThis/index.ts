declare global {
  interface FunctionConstructor {
    returnThis<T>(this: T): T;
  }
}

Function.returnThis = function <T>(this: T): T {
  return this;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
