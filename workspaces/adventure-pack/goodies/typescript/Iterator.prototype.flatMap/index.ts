import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    flatMap<TOut>(
      this: Iterator<T>,
      callbackFn: (
        element: T,
        index: number,
      ) => Iterator<TOut> | Iterable<TOut>,
    ): Generator<TOut, void, undefined>;
  }
}

iteratorPrototype.flatMap ??= function* <TIn, TOut>(
  this: Iterator<TIn>,
  callbackFn: (element: TIn, index: number) => Iterator<TOut> | Iterable<TOut>,
): Generator<TOut, void, undefined> {
  let index = 0;
  for (const element of this.toIterable()) {
    const res = callbackFn(element, index);
    if (!(Symbol.iterator in res || typeof res.next === "function")) {
      throw new TypeError("Callback must return an iterable or iterator");
    }
    yield* Symbol.iterator in res
      ? (res as Iterable<TOut>)
      : (res as Iterator<TOut>).toIterable();
    ++index;
  }
};
