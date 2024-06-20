import { iteratorPrototype } from "./iteratorPrototype";
import { iteratorToIterable } from "./iteratorToIterable";

declare global {
  interface Iterator<T> {
    map<TOut>(
      callbackFn: (element: T, index: number) => TOut,
    ): Generator<TOut, void, undefined>;
  }
}

iteratorPrototype.map = function* <TIn, TOut>(
  this: Iterator<TIn>,
  callbackFn: (element: TIn, index: number) => TOut,
) {
  let index = 0;
  for (const element of iteratorToIterable(this)) {
    yield callbackFn(element, index);
    ++index;
  }
};
