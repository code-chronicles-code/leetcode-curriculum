import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Iterator<T> {
    product(this: Iterator<number>): number;
  }
}

iteratorPrototype.product = function (this: Iterator<number>): number {
  let res = 1;
  for (const element of this.toIterable()) {
    res *= element;
  }

  return res;
};
