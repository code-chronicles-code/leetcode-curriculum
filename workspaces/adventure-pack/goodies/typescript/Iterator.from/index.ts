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
      const iterator = (object as Iterable<T>)[Symbol.iterator]();
      if (typeof iterator === "object" && Symbol.iterator in iterator) {
        return iterator as IterableIterator<T>;
      } else {
        return {
          ...iterator,
          [Symbol.iterator]() {
            return this;
          },
        } as IterableIterator<T>;
      }
    }

    if (typeof (object as Iterator<T>).toIterable === "function") {
      return (object as Iterator<T>).toIterable();
    }

    if (typeof (object as { next(): IteratorResult<T> }).next === "function") {
      return (function* () {
        let result: IteratorResult<T>;
        while (true) {
          result = (object as { next(): IteratorResult<T> }).next();
          if (result.done) {
            break;
          }
          yield result.value;
        }
      })();
    }

    throw new TypeError(
      "Object is not an iterator, iterable, or an object with a next method",
    );
  },
};
