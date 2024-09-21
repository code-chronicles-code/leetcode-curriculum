import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    forEach(
      this: Iterator<T>,
      callbackFn: (element: T, index: number) => void,
    ): void;
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
