import { describe, expect, it } from "@jest/globals";

import "./index";

const INTEGERS = [0, 1, -1, 42, 1337, -(10 ** 6)];
const NON_INTEGER_NUMBERS = [-5.3, 2.5, Math.PI, Infinity, -Infinity, NaN];
const NON_NUMBERS = [
  "12",
  "0",
  "",
  "hi",
  null,
  undefined,
  true,
  false,
  Symbol("12"),
  Symbol(undefined),
  {},
  [],
  [12],
  new Set([12]),
  new Map([[12, 34]]),
];

describe("Number.isIntegerOrIntegerObject", () => {
  it.each(INTEGERS)("returns true for integer %p", (value) => {
    expect(Number.isIntegerOrIntegerObject(value)).toBe(true);
  });

  it.each(INTEGERS)("returns true for integer object %p", (value) => {
    expect(Number.isIntegerOrIntegerObject(new Number(value))).toBe(true);
  });

  it.each(NON_INTEGER_NUMBERS)(
    "returns false for non-integer number %p",
    (value) => {
      expect(Number.isIntegerOrIntegerObject(value)).toBe(false);
    },
  );

  it.each(NON_NUMBERS)("returns false for non-number %p", (value) => {
    expect(Number.isIntegerOrIntegerObject(value)).toBe(false);
  });

  it("handles negative zero", () => {
    expect(Number.isIntegerOrIntegerObject(-0)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(-0))).toBe(true);
  });
});
