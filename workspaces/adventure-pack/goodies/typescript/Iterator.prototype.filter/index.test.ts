import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).filter;

import "./index";

describe("Iterator.prototype.filter", () => {
  it.each([
    {
      array: [2, 4, 6, 7, 8, 9],
      condition: (p: number) => p % 2 === 0,
      expected: [2, 4, 6, 8],
    },
    {
      array: [1, 2, 3, 4, 1, 5],
      condition: (p: number) => p > 2,
      expected: [3, 4, 5],
    },
  ])("can filter an Array's values()", ({ array, condition, expected }) => {
    const filterResult = array.values().filter(condition);

    for (const e of expected) {
      expect(filterResult.next().value).toBe(e);
    }

    expect(filterResult.next().done).toBe(true);
  });

  it("can filter Map entries()", () => {
    const map = new Map([
      ["A", 1],
      ["b", -2],
      ["C", 3],
      ["d", 0],
      ["E", 5],
      ["F", -1],
      ["G", 0],
    ]);
    const filterResult = map
      .entries()
      .filter(([key, value]) => key === key.toUpperCase() && value > 0);

    expect(filterResult.next().value).toStrictEqual(["A", 1]);
    expect(filterResult.next().value).toStrictEqual(["C", 3]);
    expect(filterResult.next().value).toStrictEqual(["E", 5]);
    expect(filterResult.next().done).toBe(true);
  });

  it("can filter Set values()", () => {
    const set = new Set([-3, -2, 0, 1, 2, -4, 3, 5]);
    const filterResult = set.values().filter((n) => n >= 0);
    expect(filterResult.next().value).toBe(0);
    expect(filterResult.next().value).toBe(1);
    expect(filterResult.next().value).toBe(2);
    expect(filterResult.next().value).toBe(3);
    expect(filterResult.next().value).toBe(5);
    expect(filterResult.next().done).toBe(true);
  });

  it("can access an index while filtering", () => {
    const factory = function* (): Generator<string, void, undefined> {
      yield* "hello world how are you".split(" ");
    };

    const filterResult = factory().filter((_word, i) => i % 2 === 0);
    expect(filterResult.next().value).toStrictEqual("hello");
    expect(filterResult.next().value).toStrictEqual("how");
    expect(filterResult.next().value).toStrictEqual("you");
    expect(filterResult.next().done).toBe(true);
  });
});
