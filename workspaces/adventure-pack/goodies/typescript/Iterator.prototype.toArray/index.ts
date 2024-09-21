import "../Iterator.prototype.toIterable/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    toArray(this: Iterator<T>): T[];
  }
}

iteratorPrototype.toArray ??= function <T>(this: Iterator<T>): T[] {
  return [...this.toIterable()];
};
