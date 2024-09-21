import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

iteratorPrototype.toObject = function (this: Iterator<unknown>) {
  return Object.fromEntries(
    this.toIterable() as unknown as Iterable<[unknown, unknown]>,
  );
};
