import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.sum", () => {
  it("sums an Array's values()", () => {
    expect([12, -8, 5].values().sum()).toBe(9);
  });

  it("sums a Set's values()", () => {
    expect(new Set([3, 1, 4, 1, 5, 9]).values().sum()).toBe(22);
  });

  it("returns zero for an empty iterator", () => {
    expect([].values().sum()).toBe(0);
  });

  it("has a TypeScript error when summing an iterator of strings but doesn't throw", () => {
    const iterator = ["hi"].values();

    // @ts-expect-error An iterator of strings doesn't support .sum().
    expect(() => iterator.sum()).not.toThrow();
  });
});
