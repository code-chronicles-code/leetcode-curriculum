import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    reduce(
      this: Iterator<T>,
      callbackFn: (accumulator: T, value: T, index: number) => T,
      initialValue?: T,
    ): T;
  }
}

iteratorPrototype.reduce ??= function <T>(
  this: Iterator<T>,
  callbackFn: (accumulator: T, value: T, index: number) => T,
  initialValue?: T,
): T {
  let iterator = this.toIterable()[Symbol.iterator]();
  let index = 0;
  let accumulator: T;

  if (initialValue === undefined) {
    const firstResult = iterator.next();
    if (firstResult.done) {
      throw new TypeError("Reduce of empty iterator with no initial value");
    }
    accumulator = firstResult.value;
    ++index;
  } else {
    accumulator = initialValue;
  }

  for (let res = iterator.next(); !res.done; res = iterator.next()) {
    accumulator = callbackFn(accumulator, res.value, index);
    ++index;
  }

  return accumulator;
};