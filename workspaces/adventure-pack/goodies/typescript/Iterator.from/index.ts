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
).from ??= function <T>(iterator: unknown): Iterable<T> {
  return (iterator as Iterator<T>).toIterable();
};

Iterator.from([1, 2, 3]);
Iterator.from("hello world");
Iterator.from(new Set([1, 1, 2, 3, 3]));
