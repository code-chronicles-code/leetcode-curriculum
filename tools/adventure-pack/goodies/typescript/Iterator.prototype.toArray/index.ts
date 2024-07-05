import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toArray(): T[];
  }
}

iteratorPrototype.toArray ??= function <T>(this: Iterator<T>): T[] {
  return [...this.toIterable()];
};
