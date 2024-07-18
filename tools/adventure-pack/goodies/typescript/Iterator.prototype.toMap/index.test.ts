import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.map";
import "../String.prototype.chars";

import "./index";

describe("Iterator.prototype.toMap", () => {
  it("creates a Map from an iterator of tuples", () => {
    const tuples: [string, number][] = [
      ["human", 1],
      ["cat", 9],
      ["you", 2],
    ];
    expect(tuples.values().toMap()).toEqual(new Map(tuples));
  });

  it("returns an empty Map when invoked on an empty iterator", () => {
    expect([].values().toMap()).toEqual(new Map());
  });

  it("can be used to shallow clone a Map", () => {
    const originalMap = new Map([
      [3, 4],
      ["hello", "goodbye"],
      ["a set", new Set([8, 12])],
    ] as [unknown, unknown][]);
    const newMap = originalMap.entries().toMap();

    expect(newMap).not.toBe(originalMap);
    expect(newMap).toEqual(originalMap);
    expect(newMap.get("a set")).toBe(originalMap.get("a set"));
  });

  it("can combine with other iterator methods", () => {
    expect(
      [3, 1, 4]
        .values()
        .map((num, i) => [num, i * i * i])
        .toMap(),
    ).toEqual(
      new Map([
        [3, 0],
        [1, 1],
        [4, 8],
      ]),
    );

    expect(
      "hello"
        .chars()
        .map((c) => [c, c.repeat(3)])
        .toMap(),
    ).toEqual(
      new Map([
        ["h", "hhh"],
        ["e", "eee"],
        ["l", "lll"],
        ["o", "ooo"],
      ]),
    );
  });

  it.each([[3, 1, 4].values(), "hi".chars(), new Set([3]).values()])(
    "throws when invoked on an iterator of something other than tuples",
    (iter: Iterator<unknown>) => {
      expect(() => iter.toMap()).toThrow();
    },
  );

  it("ignores extra fields in the tuples", () => {
    expect(
      [
        [3, 1, 4],
        [1, 5, 9],
      ]
        .values()
        .toMap(),
    ).toEqual(
      new Map([
        [3, 1],
        [1, 5],
      ]),
    );
  });

  it("doesn't complain about missing fields in the tuples", () => {
    expect([[]].values().toMap()).toEqual(new Map([[undefined, undefined]]));
    expect([[3], [4], [5]].values().toMap()).toEqual(
      new Map([
        [3, undefined],
        [4, undefined],
        [5, undefined],
      ]),
    );
  });
});
