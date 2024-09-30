declare global {
  interface Number {
    positiveMod(this: Number, modulo: number): number;
  }
}

Number.prototype.positiveMod = function (this: Number, modulo: number): number {
  return ((Number(this) % modulo) + Math.abs(modulo)) % modulo;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
