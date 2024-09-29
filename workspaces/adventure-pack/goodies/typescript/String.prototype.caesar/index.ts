import "../Number.prototype.chr/index.ts";
import "../Number.prototype.positiveMod/index.ts";
import "../String.prototype.ord/index.ts";

declare global {
  interface String {
    caesar(this: String): string;
    caesar(this: String, delta: number): string;
  }
}

String.prototype.caesar = function (this: String, delta: number = 1): string {
  return this.replaceAll(
    /([a-z])|[A-Z]/g,
    (letter: string, lower: string | undefined) => {
      const offset = (lower == null ? "A" : "a").ord();
      return ((letter.ord() - offset + delta).positiveMod(26) + offset).chr();
    },
  );
};
