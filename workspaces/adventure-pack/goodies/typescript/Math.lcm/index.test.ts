import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("Math.lcm", () => {
  it.each([
    [4, 5, 20],
    [6, 8, 24],
    [21, 6, 42],
    [13, 17, 221],
    [0, 5, 0],
    [5, 0, 0],
    [0, 0, 0],
    [-5, 15, 15],
    [7, -3, 21],
    [-6, -8, 24],
    [2, 1000000007, 2000000014],
    [9999991, 99999959, 999998690000369],
    [123456, 789012, 8117355456],
    [15, 25, 75],
  ])("Math.lcm(%p, %p) === %p", (a, b, expected) => {
    expect(Math.lcm(a, b)).toBe(expected);
  });
});
