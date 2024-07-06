import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.some", () => {
  it("returns true if one element passes a test and false if all elements fails the test", () => {
    const isEven = (element: number) => element % 2 === 0;
    expect([2, 4, 6, 8, 10].values().some(isEven)).toBe(true);
    expect([2, 4, 6, 7, 8, 10].values().some(isEven)).toBe(true);
    expect([1, 4, 6, 8, 10].values().some(isEven)).toBe(true);
    expect([1, 3, 5, 7, 9].values().some(isEven)).toBe(false);
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
    const callbackFn = ([key, value]: [string, number]) =>
      key === key.toUpperCase() && value > 0;
    expect(map.entries().some(callbackFn)).toBe(true);
  });

  it("can test Set values()", () => {
    const set = new Set([-1, -1, -2, -3, 3, -4, 5, 6, 6]);
    expect(set.values().some((element) => element > 0)).toBe(true);
  });

  it("can test a Generator object", () => {
    const generator = function* (): Generator<number, void, undefined> {
      yield 2;
      yield 4;
      yield 6;
      yield 8;
      yield 10;
    };

    expect(generator().some((element) => element % 2 === 0)).toBe(true);
    expect(generator().some((element) => element < 7)).toBe(true);
  });
});
