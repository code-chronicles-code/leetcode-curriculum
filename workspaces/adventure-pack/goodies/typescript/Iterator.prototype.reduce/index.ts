import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    reduce<U>(
      this: Iterator<T>,
      callbackFn: (accumulator: U, value: T, index: number) => U,
      initialValue?: U,
    ): U;
  }
}

iteratorPrototype.reduce ??= function <T extends U, U>(
  this: Iterator<T>,
  callbackFn: (accumulator: U, value: T, index: number) => T,
  initialValue?: U,
): U {
  let index = 0;
  let accumulator: U;

  if (initialValue === undefined) {
    const firstResult = this.next();
    if (firstResult.done) {
      throw new TypeError("Reduce of empty iterator with no initial value");
    }
    accumulator = firstResult.value;
    ++index;
  } else {
    accumulator = initialValue;
  }

  for (const element of this.toIterable()) {
    accumulator = callbackFn(accumulator, element, index);
    ++index;
  }

  return accumulator;
};
