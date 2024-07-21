import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).take;

import "./index";

function iteratorToArray<T>(iterator: IterableIterator<T>): T[] {
  return [...iterator];
}

describe("Iterator.prototype.take", () => {
  it("takes the specified number of elements from the iterator", () => {
    const result = iteratorToArray([1, 2, 3, 4, 5].values().take(4));
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("takes all elements if the specified number is greater than the iterator length", () => {
    const result = iteratorToArray([1, 2, 3].values().take(5));
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns an empty array if the specified number is 0", () => {
    const result = iteratorToArray([1, 2, 3, 4, 5].values().take(0));
    expect(result).toEqual([]);
  });

  it("returns an empty array for an empty iterator", () => {
    const result = iteratorToArray([].values().take(3));
    expect(result).toEqual([]);
  });

  it("handles taking elements from an infinite iterator", () => {
    function* infiniteNumbers() {
      let i = -1;
      while (true) {
        yield ++i;
      }
    }
    const result = iteratorToArray(infiniteNumbers().take(5));
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it("throws an error when taking 5 elements from an infinite iterator that errors", () => {
    function* infiniteNumbers() {
      yield 3;
      throw new Error();
    }

    expect(() => {
      iteratorToArray(infiniteNumbers().take(5));
    }).toThrow();
  });

  it("does not throw an error when taking 1 element from an infinite iterator that errors later", () => {
    function* infiniteNumbers() {
      yield 3;
      throw new Error();
    }

    expect(() => {
      iteratorToArray(infiniteNumbers().take(1));
    }).not.toThrow();
  });

  it("throws a RangeError if count is NaN", () => {
    expect(() => {
      [].values().take(NaN);
    }).toThrow(RangeError);
  });

  it("throws a RangeError if count is negative", () => {
    expect(() => {
      [].values().take(-1);
    }).toThrow(RangeError);
  });

  it("throws a RangeError if count is a negative floating-point number", () => {
    expect(() => {
      [1, 2, 3].values().take(-0.5);
    }).toThrow(RangeError);
  });

  it("throws a RangeError if count is a positive floating-point number", () => {
    expect(() => {
      [].values().take(0.5);
    }).toThrow(RangeError);
  });
});
