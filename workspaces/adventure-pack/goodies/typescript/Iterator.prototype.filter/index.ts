import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    filter(
      this: Iterator<T>,
      callbackfn: (value: T, index: number) => unknown,
    ): Generator<T, void, void>;
  }
}

iteratorPrototype.filter ??= function* <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => unknown,
): Generator<T, void, void> {
  let index = 0;
  for (const element of this.toIterable()) {
    if (callbackFn(element, index)) {
      yield element;
    }
    ++index;
  }
};
