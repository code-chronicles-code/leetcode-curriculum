declare global {
  interface Number {
    digits(): Generator<number, void, undefined>;
    digits(radix: number): Generator<number, void, undefined>;
  }
}

Number.prototype.digits = function (
  this: number,
  radix: number = 10,
): Generator<number, void, undefined> {
  // The Number cast is necessary for this check to work on LeetCode.
  if (!(Number.isInteger(Number(this)) && this >= 0)) {
    throw new Error("Must invoke on a non-negative integer.");
  }
  if (!(Number.isInteger(radix) && radix >= 2)) {
    throw new Error("Radix must be an integer >= 2.");
  }

  return function* (this: number) {
    let num = this;
    do {
      yield num % radix;
      num = Math.floor(num / radix);
    } while (num > 0);
  }.call(this);
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
