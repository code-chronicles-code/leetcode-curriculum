import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    toMap(this: Iterator<T>): MapFromEntry<T>;
  }
}

type MapFromEntry<TEntry> = TEntry extends readonly [infer K, infer V]
  ? Map<K, V>
  : TEntry extends readonly (infer E)[]
    ? Map<E, E>
    : Map<unknown, unknown>;

iteratorPrototype.toMap = function <T>(this: Iterator<T>): MapFromEntry<T> {
  return new Map(
    this.toIterable() as unknown as Iterable<[unknown, unknown]>,
  ) as unknown as MapFromEntry<T>;
};
