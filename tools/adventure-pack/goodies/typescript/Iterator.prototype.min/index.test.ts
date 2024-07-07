import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.min", () => {
  it("can find the min of an iterator of numbers", () => {
    expect([1, 2, 3].values().min()).toBe(1);
    expect([100, 12, 5.3, 1.37].values().min()).toBe(1.37);
    expect([42, 0, 1337].values().min()).toBe(0);
    expect([5, 1e100, Infinity, 7, 0, -3, -Infinity].values().min()).toBe(
      -Infinity,
    );
  });

  it("can find the min of an iterator of strings", () => {
    expect(["apple", "banana", "orange", "kiwi", ""].values().min()).toBe("");
    expect(["apple", "banana", "orange", "kiwi"].values().min()).toBe("apple");
    expect([..."supercalifragilistic"].values().min()).toBe("a");
  });

  it("can find the min of an iterator of bigints", () => {
    expect([1n, 2n, 3n].values().min()).toBe(1n);
    expect([100n, 12n, -70n, 5n].values().min()).toBe(-70n);
    expect([42n, 0n, 1337n].values().min()).toBe(0n);
    expect([2n ** 100n, 10n ** 100n, 5n].values().min()).toBe(5n);
  });

  it("can find the min of an iterator of tuples", () => {
    expect(
      [
        [2, 3],
        [7, 9],
      ]
        .values()
        .min(),
    ).toEqual([2, 3]);
  });

  it("can handle exclusively negative numbers", () => {
    expect([-78.7, -100, -78.4, -85.2].values().min()).toBe(-100);
    expect([-79n, -100n, -78n, -85n].values().min()).toBe(-100n);
  });

  it("returns undefined for an empty iterator", () => {
    expect([].values().min()).toBe(undefined);
    expect(new Set().values().min()).toBe(undefined);
    expect(new Map().values().min()).toBe(undefined);
    expect((function* () {})().min()).toBe(undefined);
  });

  it("throws if the iterator has mixed types", () => {
    expect(() => [5n, 5].values().min()).toThrow();
    expect(() => ["apple", 47, null, new Set()].values().min()).toThrow();
    expect(() => [{}, new Map(), Symbol("wat")].values().min()).toThrow();
  });

  it("throws if the iterator has incomparable types", () => {
    expect(() => [Symbol("foo"), Symbol("bar")].values().min()).toThrow();
    expect(() => [new Set([1, 2, 3]), new Set()].values().min()).toThrow();
  });

  it("doesn't throw if the iterator only has one element, even if the type is incomparable", () => {
    expect([new Set([1, 2, 3])].values().min()).toEqual(new Set([1, 2, 3]));
    expect([new Map([["hello", "goodbye"]])].values().min()).toEqual(
      new Map([["hello", "goodbye"]]),
    );
  });

  it("returns the same reference as the iterator", () => {
    const obj = {};
    expect([obj].values().min()).toBe(obj);

    const symbol = Symbol("foo");
    expect([symbol].values().min()).toBe(symbol);
  });

  it("tries to ignore NaN", () => {
    expect([1, NaN, 2, 3].values().min()).toBe(1);
    expect([NaN, 1, 2, 3].values().min()).toBe(1);
    expect([NaN, 1, NaN, 2, NaN, 3, NaN].values().min()).toBe(1);
    expect([NaN, NaN, NaN, NaN].values().min()).toBe(NaN);
    expect([NaN].values().min()).toBe(NaN);
  });

  it("still throws if NaN is present in a non-numeric iterator", () => {
    expect(() => ["hello", NaN].values().min()).toThrow();
    expect(() => [NaN, "hello"].values().min()).toThrow();
    expect(() => [5n, NaN].values().min()).toThrow();
    expect(() => [NaN, 2n].values().min()).toThrow();
    expect(() => [new Set(), NaN].values().min()).toThrow();
    expect(() => [NaN, new Set()].values().min()).toThrow();
  });
});
