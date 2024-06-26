import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Number.isIntegerOrIntegerObject", () => {
  it("returns true for integers", () => {
    expect(Number.isIntegerOrIntegerObject(0)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(1)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(-1)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(42)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(1337)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(-(10 ** 6))).toBe(true);
  });

  it("returns true for integer objects", () => {
    expect(Number.isIntegerOrIntegerObject(new Number(0))).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(1))).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(-1))).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(42))).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(1337))).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(-(10 ** 6)))).toBe(true);
  });

  it("returns false for non-integer numbers", () => {
    expect(Number.isIntegerOrIntegerObject(-5.3)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(2.5)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(Math.PI)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(Infinity)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(-Infinity)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(NaN)).toBe(false);
  });

  it("returns false for non-numbers", () => {
    expect(Number.isIntegerOrIntegerObject("12")).toBe(false);
    expect(Number.isIntegerOrIntegerObject("0")).toBe(false);
    expect(Number.isIntegerOrIntegerObject("")).toBe(false);
    expect(Number.isIntegerOrIntegerObject("hi")).toBe(false);
    expect(Number.isIntegerOrIntegerObject(null)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(undefined)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(true)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(false)).toBe(false);
    expect(Number.isIntegerOrIntegerObject(Symbol("12"))).toBe(false);
    expect(Number.isIntegerOrIntegerObject(Symbol())).toBe(false);
    expect(Number.isIntegerOrIntegerObject({})).toBe(false);
    expect(Number.isIntegerOrIntegerObject([])).toBe(false);
    expect(Number.isIntegerOrIntegerObject([12])).toBe(false);
    expect(Number.isIntegerOrIntegerObject(new Set([12]))).toBe(false);
    expect(Number.isIntegerOrIntegerObject(new Map([[12, 34]]))).toBe(false);
  });

  it("handles negative zero", () => {
    expect(Number.isIntegerOrIntegerObject(-0)).toBe(true);
    expect(Number.isIntegerOrIntegerObject(new Number(-0))).toBe(true);
  });
});
