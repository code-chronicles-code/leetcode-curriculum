import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    toSet(this: Iterator<T>): Set<T>;
  }
}

iteratorPrototype.toSet ??= function <T>(this: Iterator<T>): Set<T> {
  return new Set(this.toIterable());
};
