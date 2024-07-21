import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    take(this: Iterator<T>, count: number): IterableIterator<T>;
  }
}

iteratorPrototype.take ??= function <T>(
  this: Iterator<T>,
  count: number,
): IterableIterator<T> {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`Count must be a non-negative integer, got ${count}`);
  }

  if (count === 0) {
    return [].values();
  }

  return function* (this: Iterator<T>) {
    let index = 0;

    for (const value of this.toIterable()) {
      yield value;
      if (++index >= count) {
        return;
      }
    }
  }.call(this);
};
