import { describe, expect, it } from "@jest/globals";

import { newArray } from "./index.ts";

describe("newArray", () => {
  it("respects dimensions", () => {
    expect(newArray([2, 3, 4])).toStrictEqual([
      [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    ]);

    expect(newArray([5, 2, 3, 1], 42)).toStrictEqual([
      [
        [[42], [42], [42]],
        [[42], [42], [42]],
      ],
      [
        [[42], [42], [42]],
        [[42], [42], [42]],
      ],
      [
        [[42], [42], [42]],
        [[42], [42], [42]],
      ],
      [
        [[42], [42], [42]],
        [[42], [42], [42]],
      ],
      [
        [[42], [42], [42]],
        [[42], [42], [42]],
      ],
    ]);
  });

  it("repeats the fill value by reference", () => {
    const obj = {};
    expect(newArray([5], obj).every((elem) => elem === obj)).toBe(true);
  });

  it("constructs distinct sub-arrays", () => {
    const arr = newArray([3, 2, 4], -1);
    arr[0][0][0] = 0;
    arr[1][1][3] = 113;
    arr[2][0][2] = 202;

    expect(arr).toStrictEqual([
      [
        [0, -1, -1, -1],
        [-1, -1, -1, -1],
      ],
      [
        [-1, -1, -1, -1],
        [-1, -1, -1, 113],
      ],
      [
        [-1, -1, 202, -1],
        [-1, -1, -1, -1],
      ],
    ]);
  });

  it("can handle many dimensions", () => {
    expect(newArray([1])).toStrictEqual([null]);
    expect(newArray([1, 1])).toStrictEqual([[null]]);
    expect(newArray([1, 1, 1])).toStrictEqual([[[null]]]);
    expect(newArray([1, 1, 1, 1])).toStrictEqual([[[[null]]]]);
    expect(newArray([1, 1, 1, 1, 1])).toStrictEqual([[[[[null]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1])).toStrictEqual([[[[[[null]]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1])).toStrictEqual([[[[[[[null]]]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1])).toStrictEqual([
      [[[[[[[null]]]]]]],
    ]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1, 1])).toStrictEqual([
      [[[[[[[[null]]]]]]]],
    ]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toStrictEqual([
      [[[[[[[[[null]]]]]]]]],
    ]);

    expect(newArray([1], 8)).toStrictEqual([8]);
    expect(newArray([1, 1], 8)).toStrictEqual([[8]]);
    expect(newArray([1, 1, 1], 8)).toStrictEqual([[[8]]]);
    expect(newArray([1, 1, 1, 1], 8)).toStrictEqual([[[[8]]]]);
    expect(newArray([1, 1, 1, 1, 1], 8)).toStrictEqual([[[[[8]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1], 8)).toStrictEqual([[[[[[8]]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1], 8)).toStrictEqual([[[[[[[8]]]]]]]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1], 8)).toStrictEqual([
      [[[[[[[8]]]]]]],
    ]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1, 1], 8)).toStrictEqual([
      [[[[[[[[8]]]]]]]],
    ]);
    expect(newArray([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 8)).toStrictEqual([
      [[[[[[[[[8]]]]]]]]],
    ]);
  });

  it.each([Math.PI, Infinity, -Infinity, -1, NaN, 5.2])(
    "throws with invalid dimensions [%p]",
    (value) => {
      expect(() => newArray([value])).toThrow();
    },
  );

  it("throws when invoked without dimensions", () => {
    expect(newArray).toThrow();
    expect(() => newArray([])).toThrow();
  });
});
