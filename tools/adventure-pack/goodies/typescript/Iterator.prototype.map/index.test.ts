import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).map;

import "./index";

describe("Iterator.prototype.map", () => {
  it("can map an Array's values()", () => {
    const array = [2, 3, 5, 7];

    const mapResult = array.values().map((p) => p * 2);
    expect(mapResult.next().value).toBe(4);
    expect(mapResult.next().value).toBe(6);
    expect(mapResult.next().value).toBe(10);
    expect(mapResult.next().value).toBe(14);
    expect(mapResult.next().done).toBe(true);
  });

  it("can map a String's characters", () => {
    const s = "howdy";

    const mapResult = s[Symbol.iterator]().map((c) => [
      c,
      c.charCodeAt(0) - "a".charCodeAt(0) + 1,
    ]);
    expect(mapResult.next().value).toEqual(["h", 8]);
    expect(mapResult.next().value).toEqual(["o", 15]);
    expect(mapResult.next().value).toEqual(["w", 23]);
    expect(mapResult.next().value).toEqual(["d", 4]);
    expect(mapResult.next().value).toEqual(["y", 25]);
    expect(mapResult.next().done).toBe(true);
  });

  it("can map a Map's entries()", () => {
    const map = new Map([
      ["apple", "green"],
      ["banana", "yellow"],
      ["cherry", "red"],
    ]);

    const mapResult = map
      .entries()
      .map(([fruit, color]) => `a ${color} ${fruit}`);
    expect(mapResult.next().value).toBe("a green apple");
    expect(mapResult.next().value).toBe("a yellow banana");
    expect(mapResult.next().value).toBe("a red cherry");
    expect(mapResult.next().done).toBe(true);
  });

  it("can map a Set's values()", () => {
    const set = new Set("abba");

    const mapResult = set.values().map((c) => c + "!");
    expect(mapResult.next().value).toBe("a!");
    expect(mapResult.next().value).toBe("b!");
    expect(mapResult.next().done).toBe(true);
  });

  it("can map a regular expression result", () => {
    const matches = "Monterey".matchAll(/([aeiou])(.)/g);

    const mapResult = matches.map(([, vowel, next]) => next + vowel);
    expect(mapResult.next().value).toBe("no");
    expect(mapResult.next().value).toBe("re");
    expect(mapResult.next().value).toBe("ye");
    expect(mapResult.next().done).toBe(true);
  });

  it("can map a Generator object", () => {
    const factory = function* (): Generator<number, void, undefined> {
      yield 3;
      yield 1;
      yield 4;
    };

    const mapResult = factory().map((x) => x ** 2);
    expect(mapResult.next().value).toBe(9);
    expect(mapResult.next().value).toBe(1);
    expect(mapResult.next().value).toBe(16);
    expect(mapResult.next().done).toBe(true);
  });

  it("can access an index while mapping", () => {
    const factory = function* (): Generator<string, void, undefined> {
      yield* "hello world how are you".split(" ");
    };

    const mapResult = factory().map((word, i) => [i, word.toUpperCase()]);
    expect(mapResult.next().value).toEqual([0, "HELLO"]);
    expect(mapResult.next().value).toEqual([1, "WORLD"]);
    expect(mapResult.next().value).toEqual([2, "HOW"]);
    expect(mapResult.next().value).toEqual([3, "ARE"]);
    expect(mapResult.next().value).toEqual([4, "YOU"]);
    expect(mapResult.next().done).toBe(true);
  });
});
