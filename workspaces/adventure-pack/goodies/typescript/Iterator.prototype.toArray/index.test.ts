import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.filter";
import "../Iterator.prototype.map";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).toArray;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.toArray", () => {
  it("copies an array", () => {
    const originalArray = [1, 1, "a", 2, "b", "b", 3, "c", -7, new Set()];
    const iteratorToArray = originalArray.values().toArray();

    expect(iteratorToArray).not.toBe(originalArray);
    expect(iteratorToArray).toStrictEqual(originalArray);
  });

  it("converts a Set's values() to an array", () => {
    expect(new Set("hello").values().toArray()).toStrictEqual([
      "h",
      "e",
      "l",
      "o",
    ]);
  });

  it("returns an empty array for an empty iterator", () => {
    expect([].values().toArray()).toStrictEqual([]);
  });

  it("can chain with other iterator methods", () => {
    expect(
      [4, 1, 2, 5, 3]
        .values()
        .map((x) => x ** 2)
        .filter((x) => x % 2 === 0)
        .toArray(),
    ).toStrictEqual([16, 4]);
  });
});
