import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toMap<TIteratorElement extends readonly [unknown, unknown]>(
      this: Iterator<TIteratorElement, unknown, unknown>,
    ): Map<TIteratorElement[0], TIteratorElement[1]>;
    toMap<TIteratorElement extends readonly unknown[]>(
      this: Iterator<TIteratorElement, unknown, unknown>,
    ): Map<TIteratorElement[number], TIteratorElement[number]>;
  }
}

iteratorPrototype.toMap = function <T>(this: Iterator<T>) {
  return new Map(this.toIterable() as unknown as Iterable<[unknown, unknown]>);
};
