import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    find(
      this: Iterator<T>,
      callbackFn: (element: T, index: number) => boolean,
    ): T | undefined;
  }
}

iteratorPrototype.find ??= function <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => boolean,
): T | undefined {
  let index = 0;
  for (const element of this.toIterable()) {
    if (callbackFn(element, index)) {
      return element;
    }
    ++index;
  }
  return undefined;
};
