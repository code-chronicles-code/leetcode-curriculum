import { describe, expect, it } from "@jest/globals";
import "./index";

describe("Map.groupBy", () => {
  it("should group elements by the result of the callback function", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const result = Map.groupBy(numbers, (num) =>
      num % 2 === 0 ? "even" : "odd",
    );

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual([2, 4, 6]);
    expect(result.get("odd")).toStrictEqual([1, 3, 5]);
  });

  it("should handle empty iterables", () => {
    const emptyArray: number[] = [];
    const result = Map.groupBy(emptyArray, (num) => num.toString());

    expect(result.size).toBe(0);
  });

  it("should group strings by their length", () => {
    const words = ["one", "two", "three", "four", "five", "six"];
    const result = Map.groupBy(words, (word) => word.length);

    expect(result.size).toBe(3);
    expect(result.get(3)).toStrictEqual(["one", "two", "six"]);
    expect(result.get(4)).toStrictEqual(["four", "five"]);
    expect(result.get(5)).toStrictEqual(["three"]);
  });

  it("should use the index in the callback function", () => {
    const letters = ["a", "b", "c", "d"];
    const result = Map.groupBy(letters, (_, index) =>
      index % 2 === 0 ? "even" : "odd",
    );

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual(["a", "c"]);
    expect(result.get("odd")).toStrictEqual(["b", "d"]);
  });

  it("should handle non-array iterables", () => {
    const set = new Set(["apple", "banana", "cherry"]);
    const result = Map.groupBy(set, (fruit) => fruit[0]);

    expect(result.size).toBe(3);
    expect(result.get("a")).toStrictEqual(["apple"]);
    expect(result.get("b")).toStrictEqual(["banana"]);
    expect(result.get("c")).toStrictEqual(["cherry"]);
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

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual([2]);
    expect(result.get("odd")).toStrictEqual([1, 3]);
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

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual([2]);
    expect(result.get("odd")).toStrictEqual([1, 3]);
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

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual([["b", 2]]);
    expect(result.get("odd")).toStrictEqual([
      ["a", 1],
      ["c", 3],
    ]);
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

    expect(result.size).toBe(2);
    expect(result.get("even")).toStrictEqual([2, 4]);
    expect(result.get("odd")).toStrictEqual([1, 3]);
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

    expect(result.size).toBe(2);
    expect(result.get(undefined)).toStrictEqual([2, 4]);
    expect(result.get(null)).toStrictEqual([1, 3, 5]);
  });

  it("should handle keys that are objects or arrays", () => {
    const data = [1, 2, 3, 4];
    const even = { even: true };
    const odd = ["odd"];
    const result = Map.groupBy(data, (num) => (num % 2 === 0 ? even : odd));

    expect(result.size).toBe(2);
    expect(result.get({ even: true })).toBeUndefined();
    expect(result.get(["odd"])).toBeUndefined();
    const keys = [...result.keys()];
    expect(
      keys.some(
        (key) => typeof key === "object" && "even" in key && key.even === true,
      ),
    ).toBeTruthy();
    expect(
      keys.some((key) => Array.isArray(key) && key[0] === "odd"),
    ).toBeTruthy();
  });
});
