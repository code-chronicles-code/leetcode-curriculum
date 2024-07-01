import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.toArray", () => {
  it("converts an iterator to an array", () => {
    expect(
      [1, 1, "a", 2, "b", "b", 3, "c"][Symbol.iterator]().toArray(),
    ).toEqual([1, 1, "a", 2, "b", "b", 3, "c"]);
  });

  it("returns an empty array for an empty iterator", () => {
    expect([].values().toArray()).toEqual([]);
  });

  it("can chain with other iterator methods", () => {
    const iterator = [1, 2, 3, 4, 5].values();
    expect(
      iterator
        .map((x) => x ** 2)
        .filter((x) => x % 2 === 0)
        .toArray(),
    ).toEqual([4, 16]);
  });
});
