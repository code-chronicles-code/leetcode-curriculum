import { nullthrows } from "../nullthrows/index.ts";

declare global {
  interface String {
    ord(this: String): number;
  }
}

String.prototype.ord = function (this: String): number {
  return nullthrows(this.codePointAt(0));
};
