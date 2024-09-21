import { describe, expect, it, jest } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype/index.ts";
delete (iteratorPrototype as unknown as Record<string, unknown>).find;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Iterator.prototype.find", () => {
  it("returns the first element that satisfies the callback", () => {
    const array = [5, 2, 1, 7, -2];
    expect(array.values().find((element) => element % 2 === 0)).toBe(2);
    expect(array.values().find((element) => element > 5)).toBe(7);
    expect(array.values().find((element) => element > 0)).toBe(5);
  });

  it("returns undefined if no element satisfies the callback", () => {
    const array = [-8, -3, -9, -2];
    expect(array.values().find((element) => element > 0)).toBeUndefined();
  });

  it("returns undefined for an empty iterator", () => {
    expect([].values().find(() => true)).toBeUndefined();
  });

  it("can test Map entries()", () => {
    const map = new Map([
      ["aPpLes", { type: "fruit", price: 1.99 }],
      ["CHICKEN", { type: "meat", price: 10.99 }],
      ["oranges", { type: "fruit", price: 3.99 }],
      ["StEaK", { type: "meat", price: 8.99 }],
      ["GRAPES", { type: "fruit", price: 2.99 }],
    ]);

    expect(
      map
        .entries()
        .find(
          ([key, value]) =>
            key === key.toUpperCase() &&
            value.type === "fruit" &&
            value.price < 3.0,
        ),
    ).toStrictEqual(["GRAPES", { type: "fruit", price: 2.99 }]);
  });

  it("can test Set values()", () => {
    const set = new Set([2, 2, -3, -3, 4, -5, 5, -6, 6]);
    expect(set.values().find((element) => element > 4)).toBe(5);
  });

  it("can test a Generator object", () => {
    const generator = function* (): Generator<number, void, undefined> {
      yield 2;
      yield -4;
      yield 1;
      yield -8;
      yield 3;
    };
    expect(generator().find((element) => element % 2 === 1)).toBe(1);
  });

  it("does not check every element to determine the result", () => {
    const callbackFn = jest.fn((element: string) => element === "o");
    expect(
      ["z", "o", "d", "i", "s", "c", "o", "o", "l"].values().find(callbackFn),
    ).toBe("o");
    expect(callbackFn).toHaveBeenCalledTimes(2);
  });
});
