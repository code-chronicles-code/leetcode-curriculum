import { describe, expect, it } from "@jest/globals";

delete (Object as unknown as Record<string, unknown>).groupBy;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Object.groupBy", () => {
  it("groups elements by the result of the callback function", () => {
    const words = ["zero", "one", "two", "three", "four", "five", "six"];
    const result = Object.groupBy(words, (word) => String(word.length));

    expect(result).toStrictEqual({
      "4": ["zero", "four", "five"],
      "3": ["one", "two", "six"],
      "5": ["three"],
    });
  });

  it("allows duplicate elements", () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9];
    const result = Object.groupBy(numbers, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual({
      odd: [3, 1, 1, 5, 9, 5, 3, 5, 9, 7, 9],
      even: [4, 2, 6, 8],
    });
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
    const result = Object.groupBy(
      words,
      (word) => word.replace(/[aeiou]/gi, "").length + "!",
    );

    expect(Object.keys(result)).toStrictEqual(["2!", "1!", "3!"]);
  });

  it.each([
    [],
    [].values(),
    new Set().values(),
    new Map().entries(),
    ""[Symbol.iterator](),
    (function* () {})(),
  ])("handles empty iterables", (iterable) => {
    const result = Object.groupBy(iterable, String);

    expect(result).toStrictEqual({});
  });

  it("can use the index in the callback function", () => {
    const letters = ["a", "b", "c", "d"];
    const result = Object.groupBy(letters, (_, index) =>
      index % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual({
      even: ["a", "c"],
      odd: ["b", "d"],
    });
  });

  it("works with a Set", () => {
    const set = new Set(["apple", "banana", "cherry", "apple"]);
    const result = Object.groupBy(set, (fruit) => fruit[1]);

    expect(result).toStrictEqual({
      p: ["apple"],
      a: ["banana"],
      h: ["cherry"],
    });
  });

  it("works with a Map", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
    const result = Object.groupBy(map, ([, value]) =>
      value % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual({
      even: [["b", 2]],
      odd: [
        ["a", 1],
        ["c", 3],
      ],
    });
  });

  it("works with a generator", () => {
    const generator = (function* () {
      yield 3;
      yield 1;
      yield 4;
    })();
    const result = Object.groupBy(generator, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual({
      odd: [3, 1],
      even: [4],
    });
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

    const result = Object.groupBy(iterable, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result).toStrictEqual({
      odd: [1, 3],
      even: [2],
    });
  });

  it("throws for non-iterable arguments", () => {
    expect(() => {
      // @ts-expect-error Invalid argument.
      Object.groupBy(123, String);
    }).toThrow(TypeError);
  });
});
