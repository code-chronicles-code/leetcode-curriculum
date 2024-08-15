import { describe, expect, it } from "@jest/globals";

import { swap } from "../swap";

describe("swap", () => {
  it("swaps two elements in an array of numbers", () => {
    const arr = [1, 2, 3, 4];
    swap(arr, 1, 3);
    expect(arr).toStrictEqual([1, 4, 3, 2]);
  });

  it("swaps two elements in an array of strings", () => {
    const arr = ["a", "b", "c", "d"];
    swap(arr, 0, 2);
    expect(arr).toStrictEqual(["c", "b", "a", "d"]);
  });

  it("swaps two elements in an array of mixed types", () => {
    const arr = [1, "a", true, 3.14];
    swap(arr, 1, 3);
    expect(arr).toStrictEqual([1, 3.14, true, "a"]);
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

  it("handles arrays with multiple elements when swapping first and last indices", () => {
    const arr = [1, 2, 3, 4, 5];
    swap(arr, 0, 4);
    expect(arr).toStrictEqual([5, 2, 3, 4, 1]);
  });

  it("handles large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i);
    swap(arr, 0, 999);
    expect(arr[0]).toBe(999);
    expect(arr[999]).toBe(0);
  });

  it("works with complex objects", () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
    swap(arr, 0, 2);
    expect(arr).toStrictEqual([{ c: 3 }, { b: 2 }, { a: 1 }]);
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
});
