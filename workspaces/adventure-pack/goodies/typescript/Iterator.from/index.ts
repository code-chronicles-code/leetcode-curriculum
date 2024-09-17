import { iteratorPrototype } from "../Iterator.prototype";
import "../Iterator.prototype.toIterable";

declare global {
  interface IteratorConstructor {
    from<T>(
      object: Iterator<T> | Iterable<T> | { next(): IteratorResult<T> },
    ): IterableIterator<T>;
  }

  const Iterator: IteratorConstructor;
}

(globalThis as Record<string, unknown>).Iterator ??= {};

(globalThis as Record<string, unknown>).Iterator = {
  from<T>(
    object: Iterator<T> | Iterable<T> | { next(): IteratorResult<T> },
  ): IterableIterator<T> {
    if (typeof (object as Iterable<T>)[Symbol.iterator] === "function") {
      const iterable = object as Iterable<T>;
      const iterator = iterable[Symbol.iterator]();
      return iteratorPrototype.toIterable.call(iterator) as IterableIterator<T>;
    }

    if (Object.prototype.isPrototypeOf.call(iteratorPrototype, object)) {
      return iteratorPrototype.toIterable.call(
        object as Iterator<T>,
      ) as IterableIterator<T>;
    }

    if (typeof (object as { next(): IteratorResult<T> }).next === "function") {
      return (function* (): IterableIterator<T> {
        yield* iteratorPrototype.toIterable.call(
          object as Iterator<T>,
        ) as Iterable<T>;
      })();
    }

    throw new TypeError(
      "Object is not an iterator, iterable, or an object with a next method",
    );
  },
};
