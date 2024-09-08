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
  if (Symbol.iterator in object) {
    return object as IterableIterator<T>;
  } else if (
    "toIterable" in object &&
    typeof (object as Iterator<T>).toIterable === "function"
  ) {
    return (object as Iterator<T>).toIterable();
  } else {
    return (function* () {
      let result: IteratorResult<T>;
      do {
        result = object.next();
        if (!result.done) {
          yield result.value;
        }
      } while (!result.done);
    })();
  }
};
