import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Iterator<T> {
    product(this: Iterator<number>): number;
  }
}

iteratorPrototype.product = function (this: Iterator<number>): number {
  let res = 1;
  let isEmpty = true;

  for (const element of this.toIterable()) {
    isEmpty = false;
    res *= element;
  }

  return isEmpty ? 0 : res;
};
