import { describe, expect, it } from "@jest/globals";

import { distinctArray } from "../distinctArray.ts";

describe("distinctArray", () => {
  it("returns an empty list if given an empty list", () => {
    expect(distinctArray([])).toStrictEqual([]);
  });

  it("can handle NaN in an iterable of numbers", () => {
    const arr = [156, 89, NaN, 99, NaN, 156];
    const expected = [156, 89, NaN, 99];

    expect(distinctArray(arr)).toStrictEqual(expected);
  });

  it("can handle an iterable of booleans", () => {
    const arr = [true, true, false, false];
    const expected = [true, false];

    expect(distinctArray(arr)).toStrictEqual(expected);
  });

  it("can handle iterables like sets", () => {
    const iter = new Set([
      "uno",
      "dos",
      "tres",
      "cuatro",
      "cinco",
      "cinco",
      "seis",
    ]);
    const expected = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];

    expect(distinctArray(iter)).toStrictEqual(expected);
  });

  it("defaults to comparing objects by reference", () => {
    const obj1 = { id: "001" };
    const map = new Map<{ id: string }, string>([
      [obj1, "object 1"],
      [{ id: "O02" }, "object 2"],
      [{ id: "O03" }, "object 3"],
      [obj1, "object 1"],
      [{ id: "O04" }, "object 4"],
      [obj1, "object 1"],
    ]);

    const keys = Array.from(map.keys());
    expect(distinctArray(map)).toStrictEqual([
      [keys[0], "object 1"],
      [keys[1], "object 2"],
      [keys[2], "object 3"],
      [keys[3], "object 4"],
    ]);
  });

  it("is guaranteed to receive distinct result for a map with a keyFn", () => {
    const map = new Map([
      [1, "uno"],
      [2, "dos"],
      [3, "tres"],
      [4, "tres"],
      [5, "cinco!"],
    ]);

    expect(distinctArray(map, (val) => val[1])).toStrictEqual([
      [1, "uno"],
      [2, "dos"],
      [4, "tres"],
      [5, "cinco!"],
    ]);
  });

  it("can handle iterables like objects", () => {
    const obj = {
      *[Symbol.iterator]() {
        yield "uno";
        yield "dos";
        yield "tres";
        yield "tres";
        yield "cinco!";
      },
    };

    expect(distinctArray(obj)).toStrictEqual(["uno", "dos", "tres", "cinco!"]);
  });

  it("can handle iterables like strings", () => {
    expect(distinctArray("GNUU")).toStrictEqual(["G", "N", "U"]);
  });

  it("can take a keyFn to define distinctiveness", () => {
    const arr = [
      { name: "Joe" },
      { name: "Joe" },
      { name: "Joseph" },
      { name: "Joe" },
      { name: "Frank" },
    ];

    expect(distinctArray(arr, (val) => val.name)).toStrictEqual([
      { name: "Joe" },
      { name: "Joseph" },
      { name: "Frank" },
    ]);
  });
});
