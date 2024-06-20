import "./numberIsIntegerOrIntegerObject";

declare global {
  interface Number {
    digits(): Generator<number, void, undefined>;
    digits(radix: number): Generator<number, void, undefined>;
  }
}

Number.prototype.digits = function (
  this: Number,
  radix: number = 10,
): Generator<number, void, undefined> {
  if (!(Number.isIntegerOrIntegerObject(this) && Number(this) >= 0)) {
    throw new Error("Must invoke on a non-negative integer.");
  }
  if (!(Number.isIntegerOrIntegerObject(radix) && radix >= 2)) {
    throw new Error("Radix must be an integer >= 2.");
  }

  return function* (this: Number) {
    let num = Number(this);
    do {
      yield num % radix;
      num = Math.floor(num / radix);
    } while (num > 0);
  }.call(this);
};
