import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.map";
import "../Iterator.prototype.filter";

(globalThis as Record<string, unknown>).Iterator &&
  delete (
    (globalThis as Record<string, unknown>).Iterator as Record<string, unknown>
  ).from;

// eslint-disable-next-line import-x/first
import "./index";

describe("Iterator.from", () => {
  it("can convert an Array to an Iterator", () => {
    const array = [-3, 1, -4, 1, -5];
    const iterator = Iterator.from(array);

    expect([...iterator]).toStrictEqual(array);
  });

  it("can convert a Set to an Iterator", () => {
    const set = new Set([-3, 1, 1, -4, -4, 1, -5]);
    const iterator = Iterator.from(set);

    expect([...iterator]).toStrictEqual([...set]);
  });

  it("can convert a Map to an Iterator", () => {
    const map = new Map([
      ["z", 3],
      ["e", 1],
      ["d", 4],
    ]);
    const iterator = Iterator.from(map);
    expect([...iterator]).toStrictEqual([...map.entries()]);
  });

  it("can convert a Generator Object to an Iterator", () => {
    const factory = function* (): Generator<number, void, void> {
      yield 3;
      yield 1;
      yield 4;
      yield 1;
      yield 5;
    };
    const iterator = Iterator.from(factory());

    expect([...iterator]).toStrictEqual([3, 1, 4, 1, 5]);
  });

  it("can convert a String to an Iterator", () => {
    const string = "🚀💯🔥";
    const iterator = Iterator.from(string);

    expect([...iterator]).toStrictEqual([...string]);
  });

  it("can convert an Iterator to an IterableIterator and returns the same reference", () => {
    const array = [-3, 1, -4, 1, -5];
    const iterator = array.values();
    const convertedIterator = Iterator.from(iterator);

    expect(convertedIterator).toBe(iterator);
  });

  it("can convert an IterableIterator to an Iterator", () => {
    const array = [-3, 1, -4, 1, -5];
    const iterator = Iterator.from(array.values());
    const iterator2 = Iterator.from(iterator[Symbol.iterator]());

    expect([...iterator2]).toStrictEqual(array);
  });

  it("can convert an object with a random next() method to an Iterator", () => {
    const object = {
      values: [-3, 1, -4, 1, -5, 9],
      index: 0,
      next(): IteratorResult<number, void> {
        if (this.index < this.values.length) {
          return { value: this.values[this.index++], done: false };
        }
        return { done: true, value: undefined };
      },
    };
    const iterator = Iterator.from(object)
      .map((x) => x * 2)
      .filter((x) => x > 0);

    expect([...iterator]).toStrictEqual([2, 2, 18]);
  });

  it("throws an error if the object is not an Iterator, Iterable, or an object with a next method", () => {
    const object = {};
    // @ts-expect-error Invalid argument
    expect(() => Iterator.from(object)).toThrow(TypeError);
  });
});
