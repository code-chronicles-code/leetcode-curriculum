import "../Iterator.prototype.map/index.ts";
import "../Object.prototype.keys/index.ts";

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
