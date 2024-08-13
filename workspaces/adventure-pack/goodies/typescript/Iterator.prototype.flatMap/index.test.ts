import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).flatMap;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.flatMap", () => {
  it("can flatten an Array's values()", () => {
    const array = [-1, -5, 5, 3, 7];
    const generator = function* (p: number): Generator<number, void, void> {
      yield p;
      yield p * 2;
    };

    const flatMapResult = array.values().flatMap(generator);

    expect([...flatMapResult]).toStrictEqual([
      -1, -2, -5, -10, 5, 10, 3, 6, 7, 14,
    ]);
  });

  it("can flatten a String's characters", () => {
    const s = "hello";
    const generator = function* (c: string): Generator<string, void, void> {
      yield c;
      yield c.toUpperCase();
    };

    const flatMapResult = s[Symbol.iterator]().flatMap(generator);

    expect([...flatMapResult]).toStrictEqual([
      "h",
      "H",
      "e",
      "E",
      "l",
      "L",
      "l",
      "L",
      "o",
      "O",
    ]);
  });

  it("can flatten a Map's entries()", () => {
    const map = new Map([
      ["apple", "green"],
      ["banana", "yellow"],
      ["grape", "purple"],
    ]);
    const generator = function* ([fruit, color]: [string, string]): Generator<
      string,
      void,
      void
    > {
      yield `I found a ${color} ${fruit}.`;
      yield `I love ${color} ${fruit}s, *BITE*.`;
    };

    const flatMapResult = map.entries().flatMap(generator);

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
    const generator = function* (
      p: number,
    ): Generator<number | boolean, void, void> {
      yield p;
      yield p % 2 === 0;
    };

    const flatMapResult = set.values().flatMap(generator);

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

  it("can map a Generator object", () => {
    const factory = function* (): Generator<string, void, void> {
      yield "o";
      yield "t";
      yield "t";
      yield "e";
      yield "r";
    };

    const generator = function* (c: string): Generator<string, void, void> {
      yield c;
      yield "!";
    };

    const flatMapResult = factory().flatMap(generator);

    expect([...flatMapResult]).toStrictEqual([
      "o",
      "!",
      "t",
      "!",
      "t",
      "!",
      "e",
      "!",
      "r",
      "!",
    ]);
  });

  it("returns an empty iterator when called on an empty iterator", () => {
    const generator = function* (p: unknown): Generator<unknown, void, void> {
      yield p;
    };

    expect([].values().flatMap(generator).next().done).toBe(true);
    expect(new Set().values().flatMap(generator).next().done).toBe(true);
    expect(new Map().values().flatMap(generator).next().done).toBe(true);
    expect((function* () {})().flatMap(generator).next().done).toBe(true);
  });

  it("callback returns an iterator but not an iterable", () => {
    const iterator = [1, 2, 3].values();
    const callback = (x: unknown) =>
      ({
        next: () => ({ value: x, done: true }),
      }) as Iterator<unknown>;
    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 2, 3]);
  });

  it("callback returns an iterable but not an iterator", () => {
    const iterator = [1, 2, 3].values();
    const callback = (x: unknown) =>
      ({
        [Symbol.iterator]: function* () {
          yield x;
        },
      }) as unknown as Iterator<unknown>;
    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 2, 3]);
  });

  it("callback returns both an iterable and an iterator", () => {
    const iterator = [1, 2, 3].values();
    const callback = function* (x: unknown) {
      yield x;
    };
    const flatMapResult = iterator.flatMap(callback);
    expect([...flatMapResult]).toStrictEqual([1, 2, 3]);
  });

  it("throws a TypeError when the callback does not return an iterator or iterable", () => {
    const iterator = [1, 2, 3].values();
    const invalidCallback = (x: unknown) => x;
    // @ts-expect-error Incorrect callback return type
    expect(() => iterator.flatMap(invalidCallback).next()).toThrow(TypeError);
  });
});
