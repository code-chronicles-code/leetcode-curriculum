import { describe, expect, it } from "@jest/globals";

delete (Map as unknown as Record<string, unknown>).groupBy; // eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Map.groupBy", () => {
  it("should group elements by the result of the callback function", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = Map.groupBy(numbers, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["even", [2, 4, 6]],
        ["odd", [1, 3, 5]],
      ]),
    );
  });

  it("should handle empty iterables", () => {
    const emptyArray: number[] = [];
    const result = Map.groupBy(emptyArray, (num) => num.toString());

    expect(result).toStrictEqual(new Map());
  });

  it("should group strings by their length", () => {
    const words = ["one", "two", "three", "four", "five", "six"];
    const result = Map.groupBy(words, (word) => word.length);

    expect(result).toStrictEqual(
      new Map([
        [3, ["one", "two", "six"]],
        [4, ["four", "five"]],
        [5, ["three"]],
      ]),
    );
  });

  it("should use the index in the callback function", () => {
    const letters = ["a", "b", "c", "d"];
    const result = Map.groupBy(letters, (_, index) =>
      index % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["even", ["a", "c"]],
        ["odd", ["b", "d"]],
      ]),
    );
  });

  it("should handle non-array iterables", () => {
    const set = new Set(["apple", "banana", "cherry"]);
    const result = Map.groupBy(set, (fruit) => fruit[0]);

    expect(result).toStrictEqual(
      new Map([
        ["a", ["apple"]],
        ["b", ["banana"]],
        ["c", ["cherry"]],
      ]),
    );
  });

  it("should work with custom iterables", () => {
    const customIterable = {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };
    const result = Map.groupBy(customIterable, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["even", [2]],
        ["odd", [1, 3]],
      ]),
    );
  });

  it("should work with generators", () => {
    function* numberGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    const result = Map.groupBy(numberGenerator(), (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["even", [2]],
        ["odd", [1, 3]],
      ]),
    );
  });

  it("should work with Maps", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = Map.groupBy(map, ([_, value]) =>
      value % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["even", [["b", 2]]],
        [
          "odd",
          [
            ["a", 1],
            ["c", 3],
          ],
        ],
      ]),
    );
  });

  it("should handle objects with custom iterator", () => {
    const obj: Iterable<number> = {
      *[Symbol.iterator]() {
        const data = [1, 2, 3, 4];
        for (const item of data) {
          yield item;
        }
      },
    };
    const result = Map.groupBy(obj, (num) => (num % 2 === 0 ? "even" : "odd"));

    expect(result).toStrictEqual(
      new Map([
        ["even", [2, 4]],
        ["odd", [1, 3]],
      ]),
    );
  });

  it("should throw TypeError for non-iterable arguments", () => {
    expect(() => {
      // @ts-ignore - Intentionally passing invalid type
      Map.groupBy(123, (x) => x);
    }).toThrow(TypeError);
  });

  it("should handle undefined or null keys", () => {
    const data = [1, 2, 3, 4, 5];
    const result = Map.groupBy(data, (num) =>
      num % 2 === 0 ? undefined : null,
    );

    expect(result).toStrictEqual(
      new Map([
        [undefined, [2, 4]],
        [null, [1, 3, 5]],
      ]),
    );
  });

  it("should handle keys that are objects or arrays", () => {
    const data = [1, 2, 3, 4, 5, 6];
    const even = { even: true } as const;
    const odd = ["odd"] as const;
    const result = Map.groupBy(data, (num) => (num % 2 === 0 ? even : odd));

    expect(result.get({ even: true })).toBeUndefined();
    expect(result.get(["odd"])).toBeUndefined();

    expect(result).toStrictEqual(
      new Map<{ even: true } | readonly ["odd"], number[]>([
        [even, [2, 4, 6]],
        [odd, [1, 3, 5]],
      ]),
    );
  });
});
