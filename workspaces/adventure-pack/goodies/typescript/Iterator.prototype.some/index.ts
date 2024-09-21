import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    some(
      this: Iterator<T>,
      callbackFn: (value: T, index: number) => unknown,
    ): boolean;
  }
}

iteratorPrototype.some ??= function <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => unknown,
): boolean {
  let index = 0;
  for (const element of this.toIterable()) {
    if (callbackFn(element, index)) {
      return true;
    }
    ++index;
  }
  return false;
};
