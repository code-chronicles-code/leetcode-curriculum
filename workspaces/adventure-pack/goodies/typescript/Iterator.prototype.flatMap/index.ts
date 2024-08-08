import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    flatMap<TOut>(
      this: Iterator<T>,
      callbackFn: (element: T, index: number) => Iterator<TOut>,
    ): Generator<TOut, void, void>;
  }
}

iteratorPrototype.flatMap ??= function* <TIn, TOut>(
  this: Iterator<TIn>,
  callbackFn: (element: TIn, index: number) => Iterator<TOut>,
): Generator<TOut, void, void> {
  if (typeof this !== "object") {
    throw new TypeError("flatMap called on non-object");
  }

  let index = 0;
  for (const element of this.toIterable()) {
    const mapped = callbackFn(element, index).toIterable();
    if (typeof mapped[Symbol.iterator] !== "function") {
      throw new TypeError(
        "flatMap callback must return an iterator or iterable",
      );
    }
    for (const innerElement of mapped) {
      yield innerElement;
    }
    ++index;
  }
};
