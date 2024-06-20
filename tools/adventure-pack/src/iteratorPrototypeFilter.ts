import { iteratorPrototype } from "./iteratorPrototype";
import { iteratorToIterable } from "./iteratorToIterable";

declare global {
  interface Iterator<T> {
    filter(
      callbackFn: (element: T, index: number) => boolean,
    ): Generator<T, void, undefined>;
  }
}

iteratorPrototype.filter = function* <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => boolean,
) {
  let index = 0;
  for (const element of iteratorToIterable(this)) {
    if(callbackFn(element, index)) {
      yield element;
    }
    ++index;
  }
};
