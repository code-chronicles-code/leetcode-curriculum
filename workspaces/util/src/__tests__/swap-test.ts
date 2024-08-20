import { describe, expect, it } from "@jest/globals";

import { swap } from "../swap";

describe("swap", () => {
  it.each([
    {
      arr: [1, 2, 3, 4],
      i: 1,
      j: 3,
      expected: [1, 4, 3, 2],
      description: "swaps two elements in an array of numbers",
    },
    {
      arr: ["a", "b", "c", "d"],
      i: 0,
      j: 2,
      expected: ["c", "b", "a", "d"],
      description: "swaps two elements in an array of strings",
    },
    {
      arr: [1, "a", true, Math.PI],
      i: 1,
      j: 3,
      expected: [1, Math.PI, true, "a"],
      description: "swaps two elements in an array of mixed types",
    },
  ])("$description", ({ arr, i, j, expected }) => {
    swap(arr, i, j);
    expect(arr).toStrictEqual(expected);
  });

  it("does nothing when swapping the same index", () => {
    const arr = [1, 2, 3];
    swap(arr, 1, 1);
    expect(arr).toStrictEqual([1, 2, 3]);
  });

  it("handles arrays with one element", () => {
    const arr = [42];
    swap(arr, 0, 0);
    expect(arr).toStrictEqual([42]);
  });

  it("swaps elements when the first index is larger than the second", () => {
    const arr = [1, 2, 3, 4, 5];
    swap(arr, 4, 2);
    expect(arr).toStrictEqual([1, 2, 5, 4, 3]);
  });

  it("handles large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i);
    swap(arr, 0, 999);
    expect(arr).toStrictEqual([
      999,
      ...Array.from({ length: 998 }, (_, i) => i + 1),
      0,
    ]);
  });

  it("handles undefined values", () => {
    const arr = [undefined, "value", 42];
    swap(arr, 0, 1);
    expect(arr).toStrictEqual(["value", undefined, 42]);
  });

  it("swaps elements in an array with boolean values", () => {
    const arr = [true, false];
    swap(arr, 0, 1);
    expect(arr).toStrictEqual([false, true]);
  });

  it("swaps elements in a sparse array", () => {
    /* eslint-disable no-sparse-arrays */
    const arr = [, 2, , 4];
    swap(arr, 1, 3);
    expect(arr).toStrictEqual([, 4, , 2]);
  });

  it("swaps first and last element with negative index", () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 0, -1);
    expect(arr).toStrictEqual([4, 2, 3, 1]);
  });

  it("maintains object identity when swapping complex objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const arr = [obj1, obj2, obj3];
    swap(arr, 0, 2);
    expect(arr).toStrictEqual([obj3, obj2, obj1]);
    expect(arr[0]).toBe(obj3);
    expect(arr[2]).toBe(obj1);
  });

  it("doesn't throw on negative indexes", () => {
    const arr = [1, 2, 3];
    expect(() => swap(arr, 0, -1)).not.toThrow();
  });
});
