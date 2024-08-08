import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).flatMap;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.flatMap", () => {
  it("can flatten an Array's values()", () => {
    const array = [-1, -5, 5, 3, 7];
    const generator = function* (
      p: number,
    ): Generator<number, void, undefined> {
      yield p;
      yield p * 2;
    };

    const flatMapResult = array.values().flatMap(generator);

    expect(flatMapResult.next().value).toBe(-1);
    expect(flatMapResult.next().value).toBe(-2);
    expect(flatMapResult.next().value).toBe(-5);
    expect(flatMapResult.next().value).toBe(-10);
    expect(flatMapResult.next().value).toBe(5);
    expect(flatMapResult.next().value).toBe(10);
    expect(flatMapResult.next().value).toBe(3);
    expect(flatMapResult.next().value).toBe(6);
    expect(flatMapResult.next().value).toBe(7);
    expect(flatMapResult.next().value).toBe(14);
    expect(flatMapResult.next().done).toBe(true);
  });

  it("can flatten a String's characters", () => {
    const s = "hello";
    const generator = function* (
      c: string,
    ): Generator<string, void, undefined> {
      yield c;
      yield c.toUpperCase();
    };

    const flatMapResult = s[Symbol.iterator]().flatMap(generator);

    expect(flatMapResult.next().value).toBe("h");
    expect(flatMapResult.next().value).toBe("H");
    expect(flatMapResult.next().value).toBe("e");
    expect(flatMapResult.next().value).toBe("E");
    expect(flatMapResult.next().value).toBe("l");
    expect(flatMapResult.next().value).toBe("L");
    expect(flatMapResult.next().value).toBe("l");
    expect(flatMapResult.next().value).toBe("L");
    expect(flatMapResult.next().value).toBe("o");
    expect(flatMapResult.next().value).toBe("O");
    expect(flatMapResult.next().done).toBe(true);
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
      undefined
    > {
      yield `I found a ${color} ${fruit}.`;
      yield `I love ${color} ${fruit}s, *BITE*.`;
    };

    const flatMapResult = map.entries().flatMap(generator);

    expect(flatMapResult.next().value).toBe("I found a green apple.");
    expect(flatMapResult.next().value).toBe("I love green apples, *BITE*.");
    expect(flatMapResult.next().value).toBe("I found a yellow banana.");
    expect(flatMapResult.next().value).toBe("I love yellow bananas, *BITE*.");
    expect(flatMapResult.next().value).toBe("I found a purple grape.");
    expect(flatMapResult.next().value).toBe("I love purple grapes, *BITE*.");
    expect(flatMapResult.next().done).toBe(true);
  });

  it("can flatten a Set's values()", () => {
    const set = new Set([2, 2, -4, -4, 7, 7, 9, 9, -10, -10]);
    const generator = function* (
      p: number,
    ): Generator<number | boolean, void, undefined> {
      yield p;
      yield p % 2 === 0;
    };

    const flatMapResult = set.values().flatMap(generator);

    expect(flatMapResult.next().value).toBe(2);
    expect(flatMapResult.next().value).toBe(true);
    expect(flatMapResult.next().value).toBe(-4);
    expect(flatMapResult.next().value).toBe(true);
    expect(flatMapResult.next().value).toBe(7);
    expect(flatMapResult.next().value).toBe(false);
    expect(flatMapResult.next().value).toBe(9);
    expect(flatMapResult.next().value).toBe(false);
    expect(flatMapResult.next().value).toBe(-10);
    expect(flatMapResult.next().value).toBe(true);
    expect(flatMapResult.next().done).toBe(true);
  });

  it("can map a Generator object", () => {
    const factory = function* (): Generator<string, void, undefined> {
      yield "o";
      yield "t";
      yield "t";
      yield "e";
      yield "r";
    };

    const generator = function* (
      c: string,
    ): Generator<string, void, undefined> {
      yield c;
      yield "-";
    };

    const flatMapResult = factory().flatMap(generator);

    expect(flatMapResult.next().value).toBe("o");
    expect(flatMapResult.next().value).toBe("-");
    expect(flatMapResult.next().value).toBe("t");
    expect(flatMapResult.next().value).toBe("-");
    expect(flatMapResult.next().value).toBe("t");
    expect(flatMapResult.next().value).toBe("-");
    expect(flatMapResult.next().value).toBe("e");
    expect(flatMapResult.next().value).toBe("-");
    expect(flatMapResult.next().value).toBe("r");
    expect(flatMapResult.next().value).toBe("-");
    expect(flatMapResult.next().done).toBe(true);
  });

  it("returns an empty iterator when called on an empty iterator", () => {
    const generator = function* (
      p: unknown,
    ): Generator<unknown, void, undefined> {
      yield p;
    };

    expect([].values().flatMap(generator).next().done).toBe(true);
    expect(new Set().values().flatMap(generator).next().done).toBe(true);
    expect(new Map().values().flatMap(generator).next().done).toBe(true);
    expect((function* () {})().flatMap(generator).next().done).toBe(true);
  });

  it("throws a TypeError when flatMap is called on a non-object", () => {
    const nonObject = 123;
    const callback = (x: unknown) => [x][Symbol.iterator]();
    // @ts-expect-error Incorrect object type
    expect(() => nonObject.flatMap(callback)).toThrow(TypeError);
  });

  it("throws a TypeError when the callback does not return an iterator or iterable", () => {
    const iterator = [1, 2, 3].values();
    const invalidCallback = (x: unknown) => x;
    // @ts-expect-error Incorrect callback return type
    expect(() => iterator.flatMap(invalidCallback).next()).toThrow(TypeError);
  });
});
