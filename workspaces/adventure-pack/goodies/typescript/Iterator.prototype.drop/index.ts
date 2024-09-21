import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    drop(this: Iterator<T>, limit: number): IterableIterator<T>;
  }
}

iteratorPrototype.drop ??= function <T>(
  this: Iterator<T>,
  limit: number,
): IterableIterator<T> {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new RangeError(`Limit must be a non-negative integer, got ${limit}`);
  }

  return function* (this: Iterator<T>) {
    let index = 0;

    // Skip the first `limit` elements.
    for (const value of this.toIterable()) {
      if (index++ < limit) {
        continue;
      }
      yield value;
    }
  }.call(this);
};
