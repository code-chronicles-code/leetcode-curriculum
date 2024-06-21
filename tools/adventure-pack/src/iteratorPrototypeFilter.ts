import { iteratorPrototype } from "./iteratorPrototype";
import { iteratorToIterable } from "./iteratorToIterable";

declare global {
  interface Iterator<T> {
    filter(
      callbackfn: (value: T, index: number, array: T[]) => any,
      thisArg?: any,
    ): Generator<T, void, undefined>;
  }
}

iteratorPrototype.filter ??= function* <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number, array: T[]) => any,
) {
  let index = 0;
  const iterable = iteratorToIterable(this);
  const array = Array.from(iterable);
  for (const element of iterable) {
    if (callbackFn(element, index, array)) {
      yield element;
    }
    ++index;
  }
};
