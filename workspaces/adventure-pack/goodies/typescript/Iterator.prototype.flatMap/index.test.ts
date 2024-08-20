import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).flatMap;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.flatMap", () => {
  it("can flatten an Array's values()", () => {
    const array = [-1, -5, 5, 3, 7];
    const callback = function* (p: number): Generator<number, void, void> {
      yield p;
      yield p * 2;
    };

    const flatMapResult = array.values().flatMap(callback);

    expect([...flatMapResult]).toStrictEqual([
      -1, -2, -5, -10, 5, 10, 3, 6, 7, 14,
    ]);
  });

  it("can flatten a String's characters", () => {
    const s = "hello";
    const callback = function* (c: string): Generator<string, void, void> {
      yield c;
      yield c.toUpperCase();
    };

    const flatMapResult = s[Symbol.iterator]().flatMap(callback);

    expect([...flatMapResult]).toStrictEqual(Array.from("hHeElLlLoO"));
  });

  it("can flatten a Map's entries()", () => {
    const map = new Map([
      ["apple", "green"],
      ["banana", "yellow"],
      ["grape", "purple"],
    ]);
    const callback = function* ([fruit, color]: [string, string]): Generator<
      string,
      void,
      void
    > {
      yield `I found a ${color} ${fruit}.`;
      yield `I love ${color} ${fruit}s, *BITE*.`;
    };

    const flatMapResult = map.entries().flatMap(callback);

    expect([...flatMapResult]).toStrictEqual([
      "I found a green apple.",
      "I love green apples, *BITE*.",
      "I found a yellow banana.",
      "I love yellow bananas, *BITE*.",
      "I found a purple grape.",
      "I love purple grapes, *BITE*.",
    ]);
  });

  it("can flatten a Set's values()", () => {
    const set = new Set([2, 2, -4, -4, 7, 7, 9, 9, -10, -10]);
    const callback = function* (
      p: number,
    ): Generator<number | boolean, void, void> {
      yield p;
      yield p % 2 === 0;
    };

    const flatMapResult = set.values().flatMap(callback);

    expect([...flatMapResult]).toStrictEqual([
      2,
      true,
      -4,
      true,
      7,
      false,
      9,
      false,
      -10,
      true,
    ]);
  });

  it("can flatten a Generator object", () => {
    const factory = function* (): Generator<string, void, void> {
      yield "o";
      yield "t";
      yield "t";
      yield "e";
      yield "r";
    };

    const callback = function* (c: string): Generator<string, void, void> {
      yield c;
      yield "!";
    };

    const flatMapResult = factory().flatMap(callback);

    expect([...flatMapResult]).toStrictEqual(Array.from("o!t!t!e!r!"));
  });

  it("callback yields elements with their respective indices", () => {
    const iterator = ["🍞", "🥓", "🥬", "🍅"].values();
    const callback = function* (
      c: string,
      index: number,
    ): Generator<string, void, void> {
      yield `${index}`;
      yield c.repeat(index + 1);
    };

    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([
      "0",
      "🍞",
      "1",
      "🥓🥓",
      "2",
      "🥬🥬🥬",
      "3",
      "🍅🍅🍅🍅",
    ]);
  });

  it.each([
    [].values(),
    new Set().values(),
    new Map().values(),
    (function* () {})(),
  ])(
    "returns an empty iterator when called on an empty iterator",
    <T>(iterator: IterableIterator<T>) => {
      expect(
        iterator
          .flatMap(function* <T>(p: T): Generator<T, void, void> {
            yield p;
            yield p;
          })
          .next().done,
      ).toBe(true);
    },
  );

  it("callback returns an iterator but not an iterable", () => {
    const iterator = [1, 2, 3].values();
    const callback = <T>(x: T): Iterator<T> => {
      let count = 0;
      return Object.assign(Object.create(iteratorPrototype), {
        next() {
          if (count === 0) {
            ++count;
            return { value: x };
          }
          if (count === 1) {
            ++count;
            return { value: x, done: false };
          }
          return { done: true };
        },
      });
    };

    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });

  it("callback returns an iterable but not an iterator", () => {
    const iterator = [1, 2, 3].values();
    const callback = <T>(x: T): Iterable<T> => ({
      [Symbol.iterator]: function* () {
        yield x;
        yield x;
      },
    });
    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });

  it("callback returns both an iterable and an iterator", () => {
    const iterator = [1, 2, 3].values();
    const callback = function* <T>(x: T) {
      yield x;
      yield x;
    };
    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });

  it("throws a TypeError when the callback does not return an iterator or iterable", () => {
    const iterator = [1, 2, 3].values();
    const invalidCallback = <T>(x: T): T => x;

    // @ts-expect-error Incorrect callback return type
    const flatMapResult = iterator.flatMap(invalidCallback);

    expect(() => flatMapResult.next()).toThrow(TypeError);
  });
});
