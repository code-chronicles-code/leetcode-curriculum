import { describe, expect, it, jest } from "@jest/globals";

import "./index";

describe("Iterator.prototype.some", () => {
  it("returns true if one element passes a test and false if all elements fail the test", () => {
    const isEven = (element: number) => element % 2 === 0;
    expect([10, 2, 8, 6, 4].values().some(isEven)).toBe(true);
    expect([2, -4, -6, 7, -8, 10].values().some(isEven)).toBe(true);
    expect([1, -4, -122, 8, 1337].values().some(isEven)).toBe(true);
    expect([-1, 3, -5, 7, 129].values().some(isEven)).toBe(false);
  });

  it("returns false for an empty iterator", () => {
    expect([].values().some((element) => element > 5)).toBe(false);
  });

  it("can test Map entries()", () => {
    const map = new Map([
      ["H", 1],
      ["e", -2],
      ["L", 3],
      ["l", 0],
      ["O", 5],
      ["W", -1],
      ["O", 0],
      ["r", -5],
      ["L", 1],
      ["D", 2],
    ]);

    expect(
      map
        .entries()
        .some(([key, value]) => key === key.toUpperCase() && value > 0),
    ).toBe(true);
  });

  it("can test Set values()", () => {
    const set = new Set([-1, -1, -2, -3, 3, -4, 5, 6, 6]);
    expect(set.values().some((element) => element > 0)).toBe(true);
  });

  it("can test a Generator object", () => {
    const generator = function* (): Generator<number, void, void> {
      yield 2;
      yield 4;
      yield 6;
      yield 8;
      yield 10;
    };

    expect(generator().some((element) => element % 2 === 0)).toBe(true);
    expect(generator().some((element) => element < 7)).toBe(true);
  });

  it("does not check every element to determine the result", () => {
    const callbackFn = jest.fn((element: number) => element > 0);
    expect([-1, -8, -10, -2, 5].values().some(callbackFn)).toBe(true);
    expect(callbackFn).toHaveBeenCalledTimes(5);
  });
});
