import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    every(
      this: Iterator<T>,
      callbackFn: (value: T, index: number) => unknown,
    ): boolean;
  }
}

iteratorPrototype.every ??= function <T>(
  this: Iterator<T>,
  callbackFn: (element: T, index: number) => unknown,
): boolean {
  let index = 0;
  for (const element of this.toIterable()) {
    if (!callbackFn(element, index)) {
      return false;
    }
    ++index;
  }
  return true;
};
