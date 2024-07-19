import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.map";
import "../Object.prototype.entries";
import "../String.prototype.chars";

import "./index";

describe("Iterator.prototype.toObject", () => {
  it("creates an object from an iterator of tuples", () => {
    const tuples = [
      ["human", 1],
      ["cat", 9],
      ["you", 2],
    ] as const;

    expect(tuples.values().toObject()).toStrictEqual(
      Object.fromEntries(tuples),
    );
  });

  it("returns an empty object when invoked on an empty iterator", () => {
    expect([].values().toObject()).toStrictEqual({});
  });

  it("can be used to shallow clone an object", () => {
    const originalObject = {
      3: 4,
      hello: "goodbye",
      "a set": new Set([8, 12]),
    };
    const newObject = originalObject.entries().toObject();

    expect(newObject).not.toBe(originalObject);
    expect(newObject).toStrictEqual(originalObject);
    expect(newObject["a set"]).toBe(originalObject["a set"]);
  });

  it("can combine with other iterator methods", () => {
    expect(
      [3, 1, 4]
        .values()
        .map((num, i) => [num, i * i * i])
        .toObject(),
    ).toStrictEqual({ 3: 0, 1: 1, 4: 8 });

    expect(
      "hello"
        .chars()
        .map((c) => [c, c.repeat(3)])
        .toObject(),
    ).toStrictEqual({ h: "hhh", e: "eee", l: "lll", o: "ooo" });
  });

  it.each([[3, 1, 4].values(), "hi".chars(), new Set([3]).values()])(
    "throws when invoked on an iterator of something other than tuples",
    (iter: Iterator<unknown>) => {
      expect(() => (iter as Iterator<[]>).toObject()).toThrow();
    },
  );

  it("ignores extra fields in the tuples", () => {
    expect(
      [
        [3, 1, 4],
        [1, 5, 9],
      ]
        .values()
        .toObject(),
    ).toStrictEqual({ 3: 1, 1: 5 });
  });

  it("doesn't complain about missing fields in the tuples", () => {
    expect([[]].values().toObject()).toStrictEqual({ undefined: undefined });
    expect([[3], [4], [5]].values().toObject()).toStrictEqual({
      3: undefined,
      4: undefined,
      5: undefined,
    });
  });

  it("preserves symbol keys", () => {
    const symbol = Symbol("preserved");
    expect([[symbol, "!"]].values().toObject()).toStrictEqual({
      [symbol]: "!",
    });
  });

  it("stringifies non-string non-symbol keys", () => {
    expect(
      [
        [new Set(), "set"],
        [new Map(), "map"],
        [{}, "object"],
        [["a", "b", "c"], "array"],
        [1337n, "bigint"],
        [-2.5, "number"],
        [true, "true"],
        [false, "false"],
        [null, "null"],
        [undefined, "undefined"],
        [Infinity, "Infinity"],
        [NaN, "NaN"],
      ]
        .values()
        .toObject(),
    ).toStrictEqual({
      "[object Set]": "set",
      "[object Map]": "map",
      "[object Object]": "object",
      "a,b,c": "array",
      "1337": "bigint",
      "-2.5": "number",
      true: "true",
      false: "false",
      null: "null",
      undefined: "undefined",
      Infinity: "Infinity",
      NaN: "NaN",
    });
  });

  // TODO: add test for key order
});
