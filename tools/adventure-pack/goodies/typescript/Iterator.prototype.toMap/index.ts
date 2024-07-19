import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toMap<TElem extends readonly [unknown, unknown]>(
      this: Iterator<TElem>,
    ): Map<TElem[0], TElem[1]>;
    toMap<TElem extends readonly unknown[]>(
      this: Iterator<TElem>,
    ): Map<TElem[number], TElem[number]>;
  }
}

iteratorPrototype.toMap = function <T>(this: Iterator<T>) {
  return new Map(this.toIterable() as unknown as Iterable<[unknown, unknown]>);
};
