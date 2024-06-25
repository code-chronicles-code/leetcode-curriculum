/**
 * @adventure
 * {"name": "Iterator.prototype.min"}
 */

import "./iteratorPrototypeToIterable";

import { iteratorPrototype } from "./iteratorPrototype";

declare global {
  interface Iterator<T> {
    min(): T | undefined;
  }
}

iteratorPrototype.min = function <T>(this: Iterator<T>): T | undefined {
  const cmp = (a: unknown, b: unknown): number => {
    if (
      (typeof a === "string" && typeof b === "string") ||
      (typeof a === "number" && typeof b === "number") ||
      (typeof a === "bigint" && typeof b === "bigint")
    ) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    throw new Error("Comparing mismatched types!");
  };

  let res: T | undefined = undefined;
  let isFirst = true;
  for (const element of this.toIterable()) {
    if (
      isFirst ||
      cmp(element, res) < 0 ||
      (Number.isNaN(res) && !Number.isNaN(element))
    ) {
      res = element;
      isFirst = false;
    }
  }
  return res;
};
