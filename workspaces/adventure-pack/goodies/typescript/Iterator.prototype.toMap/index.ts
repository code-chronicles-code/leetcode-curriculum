import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Iterator<T> {
    toMap<TElem extends readonly [unknown, unknown]>(
      this: Iterator<TElem>,
    ): Map<TElem[0], TElem[1]>;
    toMap<TElem extends readonly unknown[]>(
      this: Iterator<TElem>,
    ): Map<TElem[number], TElem[number]>;
  }
}

iteratorPrototype.toMap = function (this: Iterator<unknown>) {
  return new Map(this.toIterable() as unknown as Iterable<[unknown, unknown]>);
};
