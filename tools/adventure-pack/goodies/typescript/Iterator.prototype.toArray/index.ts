/**
 * @goody {}
 */

import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toArray(): T[];
  }
}

iteratorPrototype.toArray = function <T>(this: Iterator<T>): T[] {
  const res = [];
  for (const element of this.toIterable()) {
    res.push(element);
  }
  return res;
};
