import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).take;

import "./index";

describe("Iterator.prototype.take", () => {
  it("takes the specified number of elements from the iterator", () => {
    const result = Array.from([1, 12, 3, 42, 5].values().take(4));
    expect(result).toEqual([1, 12, 3, 42]);
  });

  it("takes all elements if the specified number is greater than the iterator length", () => {
    const result = Array.from([1, 2, 3].values().take(5));
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns an empty iterator if the specified number is 0", () => {
    const result = Array.from([1, 2, 3, 4, 5].values().take(0));
    expect(result).toEqual([]);
  });

  it("returns an empty iterator for an empty iterator", () => {
    const result = Array.from([].values().take(3));
    expect(result).toEqual([]);
  });

  it("handles taking elements from an infinite iterator", () => {
    function* infiniteNumbers() {
      let i = -1;
      while (true) {
        yield ++i;
      }
    }
    const result = Array.from(infiniteNumbers().take(5));
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it("throws when taking 5 elements from an iterator that errors", () => {
    function* generateNumbers() {
      yield 3;
      throw new Error();
    }

    expect(() => {
      Array.from(generateNumbers().take(5));
    }).toThrow();
  });

  it("doesn't reach errors in the underlying iterator that happen past the limit of elements taken", () => {
    function* generateNumbers() {
      yield 3;
      throw new Error();
    }

    expect(() => {
      Array.from(generateNumbers().take(1));
    }).not.toThrow();
  });

  it.each([NaN, -1, 0.5, -0.5, Infinity, -Infinity])(
    "throws a RangeError when limit is %p",
    (value) => {
      expect(() => {
        [].values().take(value);
      }).toThrow(RangeError);
    },
  );
});
