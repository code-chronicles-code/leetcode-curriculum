import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.filter/index.ts";
import "../Iterator.prototype.map/index.ts";

import "./index.ts";

describe("Iterator.prototype.toSet", () => {
  it("adds primitives to a Set", () => {
    const arr = [1, 2, 2, 3, 1, 2, 3, 3, 100, false, 100, false, "hello"];
    const set = arr.values().toSet();

    expect(set).toStrictEqual(new Set([1, 2, 3, 100, false, "hello"]));
  });

  it("respects referential equality of objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const objectArray = [obj1, obj2, obj1, obj2, obj2, obj1];
    const set = objectArray.values().toSet();

    expect(set).toStrictEqual(new Set([obj1, obj2]));
  });

  it("adds arrays to a Set", () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arrayOfArrays = [
      arr1,
      arr2,
      arr1,
      arr1,
      arr1,
      arr1,
      arr1,
      arr1,
      arr2,
      arr2,
      arr2,
    ];
    const set = arrayOfArrays.values().toSet();

    expect(set).toStrictEqual(new Set([arr1, arr2]));
  });

  it("can convert multiple Generators to a Set", () => {
    const generator1 = function* (): Generator<string, void, void> {
      yield "a";
      yield "b";
      yield "c";
      yield "a";
    };

    const generator2 = function* (): Generator<string, void, void> {
      yield "x";
      yield "y";
      yield "z";
      yield "x";
    };

    const combinedIterator = function* (): Generator<string, void, void> {
      yield* generator1();
      yield* generator2();
    };

    const set = combinedIterator().toSet();

    expect(set).toStrictEqual(new Set(["a", "b", "c", "x", "y", "z"]));
  });

  it("adds falsy values to a Set", () => {
    const falsyValues = [
      false,
      0,
      "",
      null,
      undefined,
      NaN,
      false,
      null,
      false,
      NaN,
      0,
      "",
      "",
      0,
      0,
      undefined,
      undefined,
      undefined,
    ];
    const set = falsyValues.values().toSet();

    expect(set).toStrictEqual(new Set([false, 0, "", null, undefined, NaN]));
  });

  it("handles an empty iterator", () => {
    expect([].values().toSet()).toStrictEqual(new Set());
  });

  it("can chain with other iterator methods", () => {
    expect(
      [4, 1, 2, 5, 3, 4, 1, 5, 3, 3, 3, 5, 5, 11, 11, 11]
        .values()
        .map((x) => x ** 2)
        .filter((x) => x % 2 === 0)
        .toSet(),
    ).toStrictEqual(new Set([16, 4]));
  });
});
