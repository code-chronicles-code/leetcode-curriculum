declare global {
  interface Number {
    digits(this: Number): Generator<number, void, void>;
    digits(this: Number, radix: number): Generator<number, void, void>;
  }
}

Number.prototype.digits = function (
  this: Number,
  radix: number = 10,
): Generator<number, void, void> {
  let num = Number(this);
  if (!(Number.isInteger(num) && num >= 0)) {
    throw new Error("Must invoke on a non-negative integer.");
  }
  if (!(Number.isInteger(radix) && radix >= 2)) {
    throw new Error("Radix must be an integer >= 2.");
  }

  return (function* () {
    do {
      yield num % radix;
      num = Math.floor(num / radix);
    } while (num > 0);
  })();
};

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
