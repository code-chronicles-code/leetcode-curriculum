import "../Function.returnThis";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toIterable(): IterableIterator<T>;
  }
}

iteratorPrototype.toIterable = function <T>(
  this: Iterator<T>,
): IterableIterator<T> {
  (this as unknown as Record<symbol, unknown>)[Symbol.iterator] ??=
    Function.returnThis;
  return this as unknown as IterableIterator<T>;
};
