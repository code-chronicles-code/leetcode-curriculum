import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Number.prototype.digits", () => {
  it("can get the base 10 digits", () => {
    expect([...(123).digits(10)]).toStrictEqual([3, 2, 1]);
    expect([...(1337).digits(10)]).toStrictEqual([7, 3, 3, 1]);
    expect([...(42).digits(10)]).toStrictEqual([2, 4]);
    expect([...(123456789012345).digits(10)]).toStrictEqual([
      5, 4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ]);
    expect([...(5).digits(10)]).toStrictEqual([5]);
  });

  it("can get the base 2 digits", () => {
    expect([...(12).digits(2)]).toStrictEqual([0, 0, 1, 1]);
    expect([...(2 ** 10 - 1).digits(2)]).toStrictEqual(Array(10).fill(1));
    expect([...(2 ** 30).digits(2)]).toStrictEqual([...Array(30).fill(0), 1]);
  });

  it("can get the base 16 digits", () => {
    expect([...(16 * 15 + 14).digits(16)]).toStrictEqual([14, 15]);
  });

  it("handles larger bases", () => {
    expect([
      ...(21 * 17412 ** 2 + 12345 * 17412 + 6789).digits(17412),
    ]).toStrictEqual([6789, 12345, 21]);
  });

  it("defaults to base 10", () => {
    expect([...(42).digits()]).toStrictEqual([2, 4]);
    expect([...(8).digits()]).toStrictEqual([8]);
  });

  it("handles zero", () => {
    expect([...(0).digits()]).toStrictEqual([0]);
    expect([...(0).digits(2)]).toStrictEqual([0]);
    expect([...(0).digits(10)]).toStrictEqual([0]);
    expect([...(0).digits(16)]).toStrictEqual([0]);
    expect([...(0).digits(10 ** 6)]).toStrictEqual([0]);
  });

  it("must be invoked on a non-negative integer", () => {
    expect(() => (-1).digits()).toThrow();
    expect(() => (-123).digits()).toThrow();
    expect(() => (2.5).digits()).toThrow();
    expect(() => Math.PI.digits()).toThrow();
    expect(() => Infinity.digits()).toThrow();
    expect(() => (-Infinity).digits()).toThrow();
    expect(() => NaN.digits()).toThrow();

    expect(() => (0).digits()).not.toThrow();
    expect(() => (1).digits()).not.toThrow();
    expect(() => (42).digits()).not.toThrow();
    expect(() => (1337).digits()).not.toThrow();
  });

  it("must have an integer radix >= 2", () => {
    const n = 42;

    expect(() => n.digits(-1)).toThrow();
    expect(() => n.digits(-123)).toThrow();
    expect(() => n.digits(2.5)).toThrow();
    expect(() => n.digits(Math.PI)).toThrow();
    expect(() => n.digits(Infinity)).toThrow();
    expect(() => n.digits(-Infinity)).toThrow();
    expect(() => n.digits(NaN)).toThrow();
    expect(() => n.digits(0)).toThrow();
    expect(() => n.digits(1)).toThrow();

    expect(() => n.digits(2)).not.toThrow();
    expect(() => n.digits(10)).not.toThrow();
    expect(() => n.digits(42)).not.toThrow();
    expect(() => n.digits(1337)).not.toThrow();
  });

  it("accepts Number objects", () => {
    expect([...new Number(42).digits()]).toStrictEqual([2, 4]);
  });
});
