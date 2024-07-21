import { describe, expect, it, jest } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).every;

import "./index";

describe("Iterator.prototype.every", () => {
  it("returns true if all elements pass the test and false if an element fails a test", () => {
    const isEven = (element: number) => element % 2 === 0;
    expect([10, 2, 8, 6, 4].values().every(isEven)).toBe(true);
    expect([2, -4, -6, 7, -8, 10].values().every(isEven)).toBe(false);
    expect([1, -4, -122, 8, 1337].values().every(isEven)).toBe(false);
    expect([2, 0, 4, 18, 11].values().every(isEven)).toBe(false);
  });

  it("returns true for an empty iterator", () => {
    expect([].values().every((element) => element > 5)).toBe(true);
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
        .every(([key, value]) => key === key.toUpperCase() && value > 0),
    ).toBe(false);
  });

  it("can test Set values()", () => {
    const set = new Set([1, 1, 2, 3, 3, 4, 5, 5, 6]);
    expect(set.values().every((element) => element > 0)).toBe(true);
  });

  it("can test a Generator object", () => {
    const generator = function* (): Generator<number, void, void> {
      yield 2;
      yield 4;
      yield 6;
      yield 8;
      yield 10;
    };

    expect(generator().every((element) => element % 2 === 0)).toBe(true);
    expect(generator().every((element) => element < 7)).toBe(false);
  });

  it("does not check every element to determine the result", () => {
    const callbackFn = jest.fn((element: number) => element > 0);
    expect([6, 1, -1, 2, -10].values().every(callbackFn)).toBe(false);
    expect(callbackFn).toHaveBeenCalledTimes(3);
  });
});
