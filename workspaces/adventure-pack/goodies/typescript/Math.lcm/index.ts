import "../Math.gcd";

declare global {
  interface Math {
    lcm(a: number, b: number): number;
  }
}

Math.lcm = function (a: number, b: number): number {
  if (a === 0 || b === 0) {
    return 0;
  }

  a = Math.abs(a);
  b = Math.abs(b);
  return (a / Math.gcd(a, b)) * b;
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
