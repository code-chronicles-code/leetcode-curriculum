import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).drop;

import "./index";

describe("Iterator.prototype.drop", () => {
  it("drops the specified number of elements from the iterator", () => {
    const result = Array.from([10, 22, 33, 47, 58].values().drop(3));
    expect(result).toStrictEqual([47, 58]);
  });

  it("returns an empty iterator if the specified number is greater than the iterator length", () => {
    const result = Array.from([10, 22, 33].values().drop(5));
    expect(result).toStrictEqual([]);
  });

  it("returns the full iterator if the specified number is 0", () => {
    const result = Array.from(["cat", "dog", "otter", "bear"].values().drop(0));
    expect(result).toStrictEqual(["cat", "dog", "otter", "bear"]);
  });

  it("returns an empty iterator for an empty iterator", () => {
    const result = Array.from([].values().drop(3));
    expect(result).toStrictEqual([]);
  });

  it("drops the specified number of elements from an infinite iterator", () => {
    function* infiniteNumbers() {
      let i = -1;
      while (true) {
        yield ++i;
      }
    }
    // Drop the first 2 elements, then take the next 5 to avoid infinte loop
    const iterator = infiniteNumbers().drop(2).take(5);
    const result = [];

    for (const num of iterator) {
      result.push(num);
    }

    expect(result).toStrictEqual([2, 3, 4, 5, 6]);
  });

  it("throws when dropping elements from an iterator that errors before the drop limit", () => {
    function* generateNumbers() {
      yield 35;
      throw new Error();
    }

    expect(() => {
      Array.from(generateNumbers().drop(1));
    }).toThrow();
  });

  it("doesn't reach errors in the underlying iterator that happen before the drop limit", () => {
    function* generateNumbers() {
      yield "Maine coon";
      throw new Error();
    }

    expect(() => {
      Array.from(generateNumbers().drop(5));
    }).toThrow();
  });

  it.each([NaN, -1, 0.5, -0.5, Infinity, -Infinity])(
    "throws a RangeError when limit is %p",
    (value) => {
      expect(() => {
        [].values().drop(value);
      }).toThrow(RangeError);
    },
  );
});
