import "../Iterator.prototype.toIterable";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class Iterator<T> {
    static from<TElem>(
      object:
        | Iterator<TElem>
        | Iterable<TElem>
        | { next(): IteratorResult<TElem> },
    ): IterableIterator<TElem>;
  }
}

(globalThis as Record<string, unknown>).Iterator ??= {};

(
  (globalThis as Record<string, unknown>).Iterator as Record<string, unknown>
).from ??= function <T>(
  object: Iterator<T> | Iterable<T> | { next(): IteratorResult<T> },
): IterableIterator<T> {
  if (typeof (object as Iterable<T>)[Symbol.iterator] === "function") {
    return (object as Iterable<T>)[Symbol.iterator]() as IterableIterator<T>;
  }

  if (typeof (object as Iterator<T>).toIterable === "function") {
    return (object as Iterator<T>).toIterable();
  }

  if (typeof (object as { next(): IteratorResult<T> }).next === "function") {
    return (function* () {
      let result: IteratorResult<T>;
      do {
        result = (object as { next(): IteratorResult<T> }).next();
        if (!result.done) {
          yield result.value;
        }
      } while (!result.done);
    })();
  }

  throw new TypeError("Object is not an Iterator or Iterable");
};
