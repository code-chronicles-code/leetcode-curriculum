declare global {
  interface String {
    ord(this: String): number | undefined;
  }
}

String.prototype.ord = function (this: String): number | undefined {
  return this.codePointAt(0);
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
