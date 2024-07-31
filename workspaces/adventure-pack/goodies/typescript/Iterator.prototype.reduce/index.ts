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
  let accumulator: U = initialValue!;
  let isAccumulatorInitialized = arguments.length > 1;

  for (const element of this.toIterable()) {
    if (!isAccumulatorInitialized) {
      accumulator = element;
      isAccumulatorInitialized = true;
    } else {
      accumulator = callbackFn(accumulator, element, index);
    }
    ++index;
  }

  if (!isAccumulatorInitialized) {
    throw new TypeError("Reduce of empty iterator with no initial value");
  }

  return accumulator;
};
