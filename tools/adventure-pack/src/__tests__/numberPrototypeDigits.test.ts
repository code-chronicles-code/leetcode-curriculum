import { describe, expect, it } from "@jest/globals";

import "../numberPrototypeDigits";

describe("Number.prototype.digits", () => {
  it("can get the base 10 digits", () => {
    expect([...(123).digits(10)]).toEqual([3, 2, 1]);
    expect([...(1337).digits(10)]).toEqual([7, 3, 3, 1]);
    expect([...(42).digits(10)]).toEqual([2, 4]);
    expect([...(123456789012345).digits(10)]).toEqual([
      5, 4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ]);
    expect([...(5).digits(10)]).toEqual([5]);
  });

  it("can get the base 2 digits", () => {
    expect([...(12).digits(2)]).toEqual([0, 0, 1, 1]);
    expect([...(2 ** 10 - 1).digits(2)]).toEqual(Array(10).fill(1));
    expect([...(2 ** 30).digits(2)]).toEqual([...Array(30).fill(0), 1]);
  });

  it("can get the base 16 digits", () => {
    expect([...(16 * 15 + 14).digits(16)]).toEqual([14, 15]);
  });

  it("handles larger bases", () => {
    expect([...(21 * 17412 ** 2 + 12345 * 17412 + 6789).digits(17412)]).toEqual(
      [6789, 12345, 21],
    );
  });

  it("defaults to base 10", () => {
    expect([...(42).digits()]).toEqual([2, 4]);
    expect([...(8).digits()]).toEqual([8]);
  });

  it("handles zero", () => {
    expect([...(0).digits()]).toEqual([0]);
    expect([...(0).digits(2)]).toEqual([0]);
    expect([...(0).digits(10)]).toEqual([0]);
    expect([...(0).digits(16)]).toEqual([0]);
    expect([...(0).digits(10 ** 6)]).toEqual([0]);
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
});
