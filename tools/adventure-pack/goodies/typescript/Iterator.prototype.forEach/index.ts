/**
 * @goody {}
 */

import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    forEach(callbackFn: (element: T, index: number) => void): void;
  }
}

iteratorPrototype.forEach ??= function <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => void,
): void {
  let index = 0;
  for (const element of this.toIterable()) {
    callbackFn(element, index);
    ++index;
  }
};
