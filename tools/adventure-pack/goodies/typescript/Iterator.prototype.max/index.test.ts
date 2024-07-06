import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.max", () => {
  it("can find the max of an iterator of numbers", () => {
    expect([1, 2, 3].values().max()).toBe(3);
    expect([1, 12, 5.3, 1.37].values().max()).toBe(12);
    expect([42, 0, 1337].values().max()).toBe(1337);
    expect([5, 1e100, Infinity, 7, 0, -3, -Infinity].values().max()).toBe(
      Infinity,
    );
  });

  it("can find the max of an iterator of strings", () => {
    expect(["apple", "banana", "orange", "kiwi", ""].values().max()).toBe(
      "orange",
    );
    expect([..."supercalifragilistic"].values().max()).toBe("u");
  });

  it("can find the max of an iterator of bigints", () => {
    expect([1n, 2n, 3n].values().max()).toBe(3n);
    expect([1n, 12n, 5n, -70n].values().max()).toBe(12n);
    expect([42n, 0n, 1337n].values().max()).toBe(1337n);
    expect([5n, 2n ** 100n, 10n ** 100n].values().max()).toBe(10n ** 100n);
  });

  it("can find the max of an iterator of tuples", () => {
    expect(
      [
        [2, 3],
        [7, 9],
      ]
        .values()
        .max(),
    ).toEqual([7, 9]);
  });

  it("can handle exclusively negative numbers", () => {
    expect([-78.7, -100, -78.4, -85.2].values().max()).toBe(-78.4);
    expect([-100n, -78n, -85n].values().max()).toBe(-78n);
  });

  it("returns undefined for an empty iterator", () => {
    expect([].values().max()).toBe(undefined);
    expect(new Set().values().max()).toBe(undefined);
    expect(new Map().values().max()).toBe(undefined);
    expect((function* () {})().max()).toBe(undefined);
  });

  it("throws if the iterator has mixed types", () => {
    expect(() => [5n, 5].values().max()).toThrow();
    expect(() => ["apple", 47, null, new Set()].values().max()).toThrow();
    expect(() => [{}, new Map(), Symbol("wat")].values().max()).toThrow();
  });

  it("throws if the iterator has incomparable types", () => {
    expect(() => [Symbol("foo"), Symbol("bar")].values().max()).toThrow();
    expect(() => [new Set([1, 2, 3]), new Set()].values().max()).toThrow();
  });

  it("doesn't throw if the iterator only has one element, even if the type is incomparable", () => {
    expect([new Set([1, 2, 3])].values().max()).toEqual(new Set([1, 2, 3]));
    expect([new Map([["hello", "goodbye"]])].values().max()).toEqual(
      new Map([["hello", "goodbye"]]),
    );
  });

  it("returns the same reference as the iterator", () => {
    const obj = {};
    expect([obj].values().max()).toBe(obj);

    const symbol = Symbol("foo");
    expect([symbol].values().max()).toBe(symbol);
  });

  it("tries to ignore NaN", () => {
    expect([1, NaN, 2, 3].values().max()).toBe(3);
    expect([NaN, 1, 2, 3].values().max()).toBe(3);
    expect([NaN, 1, NaN, 2, NaN, 3, NaN].values().max()).toBe(3);
    expect([NaN, NaN, NaN, NaN].values().max()).toBe(NaN);
    expect([NaN].values().max()).toBe(NaN);
  });

  it("still throws if NaN is present in a non-numeric iterator", () => {
    expect(() => ["hello", NaN].values().max()).toThrow();
    expect(() => [NaN, "hello"].values().max()).toThrow();
    expect(() => [5n, NaN].values().max()).toThrow();
    expect(() => [NaN, 2n].values().max()).toThrow();
    expect(() => [new Set(), NaN].values().max()).toThrow();
    expect(() => [NaN, new Set()].values().max()).toThrow();
  });
});
