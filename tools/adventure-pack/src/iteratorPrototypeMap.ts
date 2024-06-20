import { iteratorPrototype } from "./iteratorPrototype";
import { iteratorToIterable } from "./iteratorToIterable";

declare global {
  interface Iterator<T> {
    map<TOut>(callbackFn: (element: T, index: number) => TOut): Generator<TOut>;
  }
}

iteratorPrototype.map = function* <TIn, TOut>(
  this: Iterator<TIn>,
  callbackFn: (value: TIn, index: number) => TOut,
) {
  let index = 0;
  for (const elem of iteratorToIterable(this)) {
    yield callbackFn(elem, index);
    ++index;
  }
};
