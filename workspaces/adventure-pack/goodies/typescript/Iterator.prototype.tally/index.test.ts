import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.filter";
import "../Iterator.prototype.map";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).toArray;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.tally", () => {
  it("tallies an Array's values()", () => {
    const array = [1, 2, 4, -1, -2, 4, 1, 2, 1];
    expect(array.values().tally()).toStrictEqual(
      new Map([
        [1, 3],
        [2, 2],
        [4, 2],
        [-1, 1],
        [-2, 1],
      ]),
    );
  });

  it("tallies a Set's values()", () => {
    const set = new Set("hello");
    expect(set.values().tally()).toStrictEqual(
      new Map([
        ["h", 1],
        ["e", 1],
        ["l", 1],
        ["o", 1],
      ]),
    );
  });

  it("can tally a Generator object", () => {
    const factory = function* (): Generator<string, void, void> {
      yield "🍉";
      yield "🍇";
      yield "🍇";
      yield "🍉";
      yield "🍇";
      yield "🍉";
      yield "🍓";
      yield "🍓";
    };

    expect(factory().tally()).toStrictEqual(
      new Map([
        ["🍉", 3],
        ["🍇", 3],
        ["🍓", 2],
      ]),
    );
  });

  it.each([
    [].values(),
    new Set().values(),
    new Map().values(),
    (function* () {})(),
  ])(
    "returns an empty tally when called on an empty iterator",
    <T>(iterator: IterableIterator<T>) => {
      expect(iterator.tally()).toStrictEqual(new Map());
    },
  );

  it("can chain with other iterator methods", () => {
    const array = [4, 1, 2, 5, 3];
    expect(
      array
        .values()
        .map((x) => x ** 2)
        .filter((x) => x % 2 === 0)
        .tally(),
    ).toStrictEqual(
      new Map([
        [16, 1],
        [4, 1],
      ]),
    );
  });

  it("can tally undefined and null values", () => {
    const array = [undefined, null, null, undefined, undefined];
    expect(array.values().tally()).toStrictEqual(
      new Map([
        [undefined, 3],
        [null, 2],
      ]),
    );
  });
});
