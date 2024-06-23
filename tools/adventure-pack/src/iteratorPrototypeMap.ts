import "./iteratorPrototypeToIterable";

import { iteratorPrototype } from "./iteratorPrototype";

declare global {
  interface Iterator<T> {
    map<TOut>(
      callbackFn: (element: T, index: number) => TOut,
    ): Generator<TOut, void, void>;
  }
}

iteratorPrototype.map = function* <TIn, TOut>(
  this: Iterator<TIn>,
  callbackFn: (element: TIn, index: number) => TOut,
): Generator<TOut, void, void> {
  let index = 0;
  for (const element of this.toIterable()) {
    yield callbackFn(element, index);
    ++index;
  }
};
