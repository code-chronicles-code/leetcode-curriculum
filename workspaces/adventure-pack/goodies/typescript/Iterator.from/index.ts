import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface IteratorConstructor {
    from<T>(
      object: Iterator<T> | Iterable<T> | { next(): IteratorResult<T> },
    ): IterableIterator<T>;
  }

  const Iterator: IteratorConstructor;
}

(globalThis as Record<string, unknown>).Iterator ??= {};

((globalThis as Record<string, unknown>).Iterator as { from: unknown }).from ??=
  function <T>(
    object: Iterator<T> | Iterable<T> | { next(): IteratorResult<T> },
  ): IterableIterator<T> {
    const toIterable = iteratorPrototype.toIterable as (
      this: Iterator<T>,
    ) => IterableIterator<T>;

    const iteratorFactory = (object as Iterable<T>)[Symbol.iterator];
    if (typeof iteratorFactory === "function") {
      return toIterable.call(iteratorFactory.call(object));
    }

    if (Object.prototype.isPrototypeOf.call(iteratorPrototype, object)) {
      return toIterable.call(object as Iterator<T>);
    }

    if (typeof (object as Record<string, unknown>).next === "function") {
      return (function* () {
        yield* toIterable.call(object as Iterator<T>);
      })();
    }

    throw new TypeError(
      "Object is not an iterator, iterable, or an object with a next method",
    );
  };
