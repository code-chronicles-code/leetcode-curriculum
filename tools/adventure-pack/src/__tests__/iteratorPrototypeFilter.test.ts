import { describe, expect, it } from "@jest/globals";

import "../iteratorPrototypeFilter";

describe("Iterator.prototype.filter", () => {
  it("can filter an Array's values()", () => {
    const array = [2, 4, 6, 7, 8];

    const filterResult = array.values().filter((p) => p % 2 === 0);
    expect(filterResult.next().value).toBe(2);
    expect(filterResult.next().value).toBe(4);
    expect(filterResult.next().value).toBe(6);
    expect(filterResult.next().value).toBe(8);
    expect(filterResult.next().done).toBe(true);
  });

  it("can filter an Array's values() with different condition", () => {
    const array = [1, 2, 3, 4, 5];

    const filterResult = array.values().filter((p) => p > 2);
    expect(filterResult.next().value).toBe(3);
    expect(filterResult.next().value).toBe(4);
    expect(filterResult.next().value).toBe(5);
    expect(filterResult.next().done).toBe(true);
  });

  it("can filter Map entries()", () => {
    const map = new Map([
      ['A', 1],
      ['b', -2],
      ['C', 3],
      ['d', 0],
      ['E', 5]
    ]);
    const filterResult = map.entries().filter(([key, value]) => key === key.toUpperCase() && value > 0);

    expect(filterResult.next().value).toEqual(['A', 1]);
    expect(filterResult.next().value).toEqual(['C', 3]);
    expect(filterResult.next().value).toEqual(['E', 5]);
    expect(filterResult.next().done).toBe(true);
  });

  it("can filter Set values()", () => {
    const set = new Set([-3, -2, 0, 1, 2, 3]);
    const filterResult = set.values().filter((n) => n >= 0);
    expect(filterResult.next().value).toBe(0);
    expect(filterResult.next().value).toBe(1);
    expect(filterResult.next().value).toBe(2);
    expect(filterResult.next().value).toBe(3);
    expect(filterResult.next().done).toBe(true);
  });

  it("can access an index while filtering", () => {
    const factory = function* (): Generator<string, void, undefined> {
      yield* "hello world how are you".split(" ");
    };

    const filterResult = factory().filter((_word, i) => i > 1);
    expect(filterResult.next().value).toEqual('how');
    expect(filterResult.next().value).toEqual('are');
    expect(filterResult.next().value).toEqual('you');
    expect(filterResult.next().done).toBe(true);
  });
});
