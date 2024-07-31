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
  const iterator = this.toIterable()[Symbol.iterator]();
  let index = 0;
  let accumulator: U;

  if (initialValue === undefined) {
    const firstResult = iterator.next();
    if (firstResult.done) {
      throw new TypeError("Reduce of empty iterator with no initial value");
    }
    accumulator = firstResult.value as unknown as U;
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
