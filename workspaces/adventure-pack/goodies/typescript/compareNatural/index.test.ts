import { describe, expect, it } from "@jest/globals";

import { compareNatural } from "./index.ts";

describe("compareNatural", () => {
  it("compares numbers", () => {
    expect(compareNatural(3, 10)).toBeLessThan(0);
    expect(compareNatural(12, 42)).toBeLessThan(0);
    expect(compareNatural(12, 1)).toBeGreaterThan(0);
    expect(compareNatural(12, 100)).toBeLessThan(0);
    expect(compareNatural(5, -100)).toBeGreaterThan(0);
    expect(compareNatural(37, 37)).toBe(0);
    expect(compareNatural(3.14, 2.5)).toBeGreaterThan(0);
    expect(compareNatural(1e100, Infinity)).toBeLessThan(0);
  });

  it("considers negative zero equal to positive zero", () => {
    expect(compareNatural(0, -0)).toBe(0);
  });

  it("compares strings", () => {
    expect(compareNatural("hello", "goodbye")).toBeGreaterThan(0);
    expect(compareNatural("ABC", "abc")).toBeLessThan(0);
    expect(compareNatural("12", "100")).toBeGreaterThan(0);
    expect(compareNatural("hello", "hello")).toBe(0);
    expect(compareNatural("", "abc")).toBeLessThan(0);
  });

  it("compares bigints", () => {
    expect(compareNatural(3n, 10n)).toBeLessThan(0);
    expect(compareNatural(12n, 42n)).toBeLessThan(0);
    expect(compareNatural(12n, 1n)).toBeGreaterThan(0);
    expect(compareNatural(12n, 100n)).toBeLessThan(0);
    expect(compareNatural(5n, -100n)).toBeGreaterThan(0);
    expect(compareNatural(37n, 37n)).toBe(0);
  });

  it("compares arrays", () => {
    expect(compareNatural([3], [10])).toBeLessThan(0);
    expect(compareNatural([12n, "hello"], [10n, "goodbye"])).toBeGreaterThan(0);
    expect(compareNatural([42, "a", -5n], [42, "a", -10n])).toBeGreaterThan(0);
    expect(compareNatural([[3, 14], "a"], [[3, 14], "b"])).toBeLessThan(0);
  });

  it("compares arrays by length if one array is a prefix of the other", () => {
    expect(compareNatural([], [])).toBe(0);
    expect(compareNatural([1, 2, 3], [1, 2, 3])).toBe(0);
    expect(compareNatural([1, 2, 3, 4], [1, 2, 3])).toBeGreaterThan(0);
    expect(compareNatural(["abc"], ["abc", []])).toBeLessThan(0);
    expect(compareNatural([[[[[], 12]]]], [[[[[]]]]])).toBeGreaterThan(0);
  });

  it("throws if comparing mismatched types", () => {
    expect(() => compareNatural(0, null)).toThrow();
    expect(() => compareNatural<string | number>(5, "12")).toThrow();
    expect(() => compareNatural<number | bigint>(2n, 2)).toThrow();
    expect(() => compareNatural<number | number[]>([7], -5)).toThrow();
    expect(() => compareNatural([7, 5n], [5n, 7])).toThrow();
  });

  it("throws if comparing incomparable types", () => {
    expect(() => compareNatural(null, null)).toThrow();
    expect(() => compareNatural(undefined, undefined)).toThrow();
    expect(() => compareNatural({}, {})).toThrow();
    expect(() => compareNatural(new Set(), new Set())).toThrow();
    expect(() => compareNatural(new Map(), new Map())).toThrow();
    expect(() => compareNatural(Symbol("foo"), Symbol("bar"))).toThrow();
  });

  it("doesn't throw if comparing with NaN", () => {
    expect(() => compareNatural(NaN, 5)).not.toThrow();
    expect(() => compareNatural(-1.3, NaN)).not.toThrow();
  });
});
