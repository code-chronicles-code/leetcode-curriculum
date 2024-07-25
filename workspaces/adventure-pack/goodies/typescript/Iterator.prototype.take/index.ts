import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    take(this: Iterator<T>, limit: number): IterableIterator<T>;
  }
}

iteratorPrototype.take ??= function <T>(
  this: Iterator<T>,
  limit: number,
): IterableIterator<T> {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError(`Limit must be a non-negative integer, got ${limit}`);
  }

  if (limit === 0) {
    return [].values();
  }

  return function* (this: Iterator<T>) {
    let index = 0;

    for (const value of this.toIterable()) {
      yield value;
      if (++index >= limit) {
        return;
      }
    }
  }.call(this);
};
