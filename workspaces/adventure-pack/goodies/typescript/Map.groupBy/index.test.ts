import { describe, expect, it } from "@jest/globals";

delete (Map as unknown as Record<string, unknown>).groupBy;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Map.groupBy", () => {
  it("groups elements by the result of the callback function", () => {
    const words = ["zero", "one", "two", "three", "four", "five", "six"];
    const result = Map.groupBy(words, (word) => word.length);

    expect(result).toStrictEqual(
      new Map([
        [4, ["zero", "four", "five"]],
        [3, ["one", "two", "six"]],
        [5, ["three"]],
      ]),
    );
  });

  it("allows duplicate elements", () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9];
    const result = Map.groupBy(numbers, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["odd", [3, 1, 1, 5, 9, 5, 3, 5, 9, 7, 9]],
        ["even", [4, 2, 6, 8]],
      ]),
    );
  });

  it("respects key order", () => {
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    const result = Map.groupBy(
      words,
      (word) => word.replace(/[aeiou]/gi, "").length,
    );

    expect([...result.keys()]).toStrictEqual([2, 1, 3]);
  });

  it.each([
    [],
    [].values(),
    new Set().values(),
    new Map().entries(),
    ""[Symbol.iterator](),
    (function* () {})(),
  ])("handles empty iterables", (iterable) => {
    const result = Map.groupBy(iterable, String);

    expect(result).toStrictEqual(new Map());
  });

  it("can use the index in the callback function", () => {
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

  it("works with a Set", () => {
    const set = new Set(["apple", "banana", "cherry", "apple"]);
    const result = Map.groupBy(set, (fruit) => fruit[1]);

    expect(result).toStrictEqual(
      new Map([
        ["p", ["apple"]],
        ["a", ["banana"]],
        ["h", ["cherry"]],
      ]),
    );
  });

  it("works with a Map", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = Map.groupBy(map, ([, value]) =>
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

  it("works with a generator", () => {
    const generator = (function* () {
      yield 3;
      yield 1;
      yield 4;
    })();
    const result = Map.groupBy(generator, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["odd", [3, 1]],
        ["even", [4]],
      ]),
    );
  });

  it("works with a custom iterable", () => {
    const iterable = {
      [Symbol.iterator]() {
        let count = 0;
        return {
          next: () =>
            count < 3 ? { value: ++count } : { done: true, value: undefined },
        };
      },
    } as Iterable<number>;

    const result = Map.groupBy(iterable, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual(
      new Map([
        ["odd", [1, 3]],
        ["even", [2]],
      ]),
    );
  });

  it("works with nullish keys", () => {
    const data = [3, 1, 4, 1, 5, 9];
    const result = Map.groupBy(data, (num) => (num === 1 ? undefined : null));

    expect(result).toStrictEqual(
      new Map([
        [null, [3, 4, 5, 9]],
        [undefined, [1, 1]],
      ]),
    );
  });

  it("treats non-primitive keys by reference", () => {
    const data = [1, 4, 3, 2, 6, 5];
    const even = { even: true } as const;
    const odd = ["odd"] as const;
    const result = Map.groupBy(data, (num) => (num % 2 === 0 ? even : odd));

    expect(result.has({ even: true })).toBe(false);
    expect(result.has(["odd"])).toBe(false);

    expect(result).toStrictEqual(
      new Map<{ even: true } | readonly ["odd"], number[]>([
        [odd, [1, 3, 5]],
        [even, [4, 2, 6]],
      ]),
    );
  });

  it("throws for non-iterable arguments", () => {
    expect(() => {
      // @ts-expect-error Invalid argument.
      Map.groupBy(123, (x) => x);
    }).toThrow(TypeError);
  });
});
