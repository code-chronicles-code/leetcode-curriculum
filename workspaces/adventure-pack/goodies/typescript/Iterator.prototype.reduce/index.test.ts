import { describe, expect, it } from "@jest/globals";

import "../String.prototype.chars";
import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).reduce;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.reduce", () => {
  it("can reduce an iterator without an initial value", () => {
    const array = [2, -4, 6, -8, 10];
    expect(array.values().reduce((a, b) => a + b)).toBe(6);
  });

  it("", () => {
    const array = [2, -4, 6, -8, 10];
    let set = new Set();
    // @ts-expect-error
    set = array.values().reduce((a, b) => a + b);
  });

  it("can reduce an iterator to a Map", () => {
    expect(
      ["ice cream", "chocolate", "banana", "cherry"]
        .values()
        .reduce(
          (map, ingredient, index) => map.set(index, ingredient),
          new Map(),
        ),
    ).toStrictEqual(
      new Map([
        [0, "ice cream"],
        [1, "chocolate"],
        [2, "banana"],
        [3, "cherry"],
      ]),
    );
  });

  it("can reduce an iterator to a Set", () => {
    expect(
      [2, 2, -3, -3, 4, -5, 5, -6, 6, -6]
        .values()
        .reduce((set, num) => set.add(num), new Set()),
    ).toStrictEqual(new Set([2, -3, 4, -5, 5, -6, 6]));
  });

  it("can reduce an iterator to an Object", () => {
    const generator = function* (): Generator<number, void, undefined> {
      yield 2;
      yield 2;
      yield -4;
      yield -4;
      yield 6;
      yield 6;
      yield 6;
    };
    expect(
      generator().reduce((freq: Record<number, number>, num) => {
        freq[num] = (freq[num] ?? 0) + 1;
        return freq;
      }, {}),
    ).toStrictEqual({ "2": 2, "-4": 2, "6": 3 });
  });

  it.each([[].values(), "".chars(), new Set().values(), new Map().keys()])(
    "throws if the iterator contains no elements and initialValue is not provided",
    (iter: Iterator<unknown>) => {
      expect(() => iter.reduce((a, _) => a)).toThrow();
    },
  );
});
