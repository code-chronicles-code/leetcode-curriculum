import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.product", () => {
  it("multiplies an Array's values()", () => {
    expect([12, -8, 5].values().product()).toBe(-480);
  });

  it("multipies a Set's values()", () => {
    expect(new Set([3, 1, 4, 1, 5, 9, 2, 6, 5]).values().product()).toBe(6480);
  });

  it("returns zero for an empty iterator", () => {
    expect([].values().product()).toBe(0);
  });

  it("has a TypeScript error when summing an iterator of strings but doesn't throw", () => {
    const iterator = ["hello", "Universe"].values();

    // @ts-expect-error An iterator of strings doesn't support .product().
    expect(() => iterator.product()).not.toThrow();
  });
});
