import { describe, expect, it } from "@jest/globals";

import { distinctArray } from "../distinctArray.ts";

describe("distinctArray", () => {
  it("deduplicates numbers", () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

    expect(distinctArray(arr)).toStrictEqual([3, 1, 4, 5, 9, 2, 6]);
  });

  it("deduplicates booleans", () => {
    const arr = [true, true, false, false, true, false];

    expect(distinctArray(arr)).toStrictEqual([true, false]);
  });

  it("uses strict equality", () => {
    const arr = [null, undefined, "5", 5, "", 0, false, "0"];

    expect(distinctArray(arr)).toStrictEqual([
      null,
      undefined,
      "5",
      5,
      "",
      0,
      false,
      "0",
    ]);
  });

  it("deduplicates NaN values", () => {
    const arr = [156, 89, NaN, 99, NaN, 156, Infinity, Infinity];

    expect(distinctArray(arr)).toStrictEqual([156, 89, NaN, 99, Infinity]);
  });

  it("deduplicates negative zero and zero", () => {
    const arr = [314, 0, 159, -0, 265, -Infinity, Infinity];

    expect(distinctArray(arr)).toStrictEqual([
      314,
      0,
      159,
      265,
      -Infinity,
      Infinity,
    ]);
  });

  it.each([
    [],
    [].values(),
    new Set().values(),
    new Map().entries(),
    ""[Symbol.iterator](),
    (function* () {})(),
  ])("returns an empty array if given an empty iterable", (iterable) => {
    expect(distinctArray(iterable)).toStrictEqual([]);
  });

  it("defaults to comparing objects by reference", () => {
    const repeatedReference = { id: "007" };
    const arr = [
      { id: "008" },
      repeatedReference,
      { id: "0011" },
      repeatedReference,
      { id: "009" },
      repeatedReference,
      { id: "006" },
      { id: "009" },
      { id: "009" },
      { id: "007" },
    ];

    expect(distinctArray(arr)).toStrictEqual([
      { id: "008" },
      { id: "007" },
      { id: "0011" },
      { id: "009" },
      { id: "006" },
      { id: "009" },
      { id: "009" },
      { id: "007" },
    ]);
  });

  it("can take a key function to define distinctiveness", () => {
    const arr = [
      { name: "Joe" },
      { name: "Joe" },
      { name: "Joseph" },
      { name: "Joe" },
      { name: "Frank" },
    ];

    expect(distinctArray(arr)).toStrictEqual(arr);

    expect(distinctArray(arr, (val) => val.name)).toStrictEqual([
      { name: "Joe" },
      { name: "Joseph" },
      { name: "Frank" },
    ]);
  });

  it("keeps the first occurring element based on the key", () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];

    expect(distinctArray(arr, (val) => val % 2)).toStrictEqual([3, 4]);
  });

  it("works with a generator", () => {
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

  it("can get the distinct characters of a string", () => {
    expect(distinctArray("GNUU")).toStrictEqual(["G", "N", "U"]);
  });
});
