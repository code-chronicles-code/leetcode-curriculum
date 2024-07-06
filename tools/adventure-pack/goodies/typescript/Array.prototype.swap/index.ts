declare global {
  interface Array<T> {
    swap(this: T[], i: number, j: number): void;
  }
}

Array.prototype.swap = function <T>(this: T[], i: number, j: number): void {
  const tmp = this[i];
  this[i] = this[j];
  this[j] = tmp;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
