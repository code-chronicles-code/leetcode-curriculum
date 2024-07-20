import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toObject<TElem extends readonly [unknown, unknown]>(
      this: Iterator<TElem>,
    ): Record<PropertyKeyify<TElem[0]>, TElem[1]>;
    toObject<TElem extends readonly unknown[]>(
      this: Iterator<TElem>,
    ): Map<PropertyKeyify<TElem[number]>, TElem[number]>;
  }
}

type PropertyKeyify<T> = T extends string | symbol
  ? T
  : T extends number | bigint | boolean | null | undefined
    ? `${T}`
    : T extends { toString(): infer S extends PropertyKey }
      ? S
      : string;

iteratorPrototype.toObject = function <T>(this: Iterator<T>) {
  return Object.fromEntries(
    this.toIterable() as unknown as Iterable<[unknown, unknown]>,
  );
};
