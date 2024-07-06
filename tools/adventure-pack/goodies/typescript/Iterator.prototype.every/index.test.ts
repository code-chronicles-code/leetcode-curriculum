import {describe, expect, it} from "@jest/globals";

import "./index";

describe("Iterator.prototype.every", () => {
  it("should return true if all elements pass the test and false if an element fails a test", () => {
    const callbackFn = (element: number) => element % 2 === 0;
    expect([2, 4, 6, 8, 10].values().every(callbackFn)).toBe(true);
    expect([2, 4, 6, 7, 8, 10].values().every(callbackFn)).toBe(false);
    expect([1, 4, 6, 8, 10].values().every(callbackFn)).toBe(false);
    expect([2, 4, 6, 8, 4].values().every(callbackFn)).toBe(false);
  });

  it("should return true for an empty iterator", () => {
    expect([].values().every((element: number) => element > 5)).toBe(true);
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
    const callbackFn = ([key, value]: [string, number]) => key === key.toUpperCase() && value > 0;
    expect(map.entries().every(callbackFn)).toBe(false);
  })

  it("can test Set values()", () => {
    const set = new Set([1, 1, 2, 3, 3, 4, 5, 5, 6]);
    expect(set.values().every((element: number) => element > 0)).toBe(true);
  })

  it("can test a Generator object", () => {
    const generator = function* (): Generator<number, void, undefined> {
      yield 2;
      yield 4;
      yield 6;
      yield 8;
      yield 10;
    }
  
    expect(generator().every((element: number) => element % 2 === 0)).toBe(true);
    expect(generator().every((element: number) => element < 7)).toBe(false);
  })
});