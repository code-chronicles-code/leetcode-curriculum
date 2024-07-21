import "../Iterator.prototype.map";
import "../Object.prototype.keys";

declare global {
  interface Object {
    values<T extends {}>(this: T): Generator<T[keyof T], void, void>;
  }
}

Object.prototype.values = function <T extends {}>(
  this: T,
): Generator<T[keyof T], void, void> {
  return this.keys().map((k) => this[k]);
};
