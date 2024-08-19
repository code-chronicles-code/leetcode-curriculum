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
    {
      arr: [1, 2, 3],
      i: 1,
      j: 1,
      expected: [1, 2, 3],
      description: "does nothing when swapping the same index",
    },
    {
      arr: [42],
      i: 0,
      j: 0,
      expected: [42],
      description: "handles arrays with one element",
    },
    {
      arr: [1, 2, 3, 4, 5],
      i: 4,
      j: 2,
      expected: [1, 2, 5, 4, 3],
      description:
        "swaps elements when the first index is larger than the second",
    },
    {
      arr: Array.from({ length: 1000 }, (_, i) => i),
      i: 0,
      j: 999,
      expected: [999, ...Array.from({ length: 998 }, (_, i) => i + 1), 0],
      description: "handles large arrays",
    },
    {
      arr: [undefined, "value", 42],
      i: 0,
      j: 1,
      expected: ["value", undefined, 42],
      description: "handles undefined values",
    },
    {
      arr: [true, false],
      i: 0,
      j: 1,
      expected: [false, true],
      description: "swaps elements in an array with boolean values",
    },
    {
      arr: [, 2, , 4],
      i: 1,
      j: 3,
      expected: [, 4, , 2],
      description: "swaps elements in a sparse array",
    },
    {
      arr: [1, 2, 3, 4],
      i: 0,
      j: -1,
      expected: [4, 2, 3, 1],
      description: "swaps first and last element with negative index",
    },
  ])("$description", ({ arr, i, j, expected }) => {
    swap(arr, i, j);
    expect(arr).toStrictEqual(expected);
  });

  it("ensures referential equality when swapping complex objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const arr = [obj1, obj2, obj3];
    swap(arr, 0, 2);
    expect(arr).toStrictEqual([obj3, obj2, obj1]);
    expect(arr[0]).toBe(obj3);
    expect(arr[2]).toBe(obj1);
  });

  it("handles negative index out of bounds", () => {
    const arr = [1, 2, 3];
    expect(() => swap(arr, 0, -1)).not.toThrow();
  });
});
