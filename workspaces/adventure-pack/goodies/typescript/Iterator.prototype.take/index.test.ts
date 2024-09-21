import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype/index.ts";
delete (iteratorPrototype as unknown as Record<string, unknown>).take;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Iterator.prototype.take", () => {
  it("takes the specified number of elements from the iterator", () => {
    const iterator = [1, 12, 3, 42, 5].values();
    expect([...iterator.take(4)]).toStrictEqual([1, 12, 3, 42]);
  });

  it("takes all elements if the limit exceeds the number of available elements in the iterator", () => {
    const iterator = new Set([1, 3, 2.5]).values();
    expect([...iterator.take(5)]).toStrictEqual([1, 3, 2.5]);
  });

  it("returns an empty iterator if the limit is 0", () => {
    const iterator = [3, 1, 4, 1, 5, 9].values().take(0);
    expect([...iterator.take(0)]).toStrictEqual([]);
  });

  it("returns an empty iterator for an empty iterator", () => {
    const iterator = [].values();
    expect([...iterator.take(3)]).toStrictEqual([]);
  });

  it("handles taking elements from an infinite iterator", () => {
    const iterator = (function* () {
      let i = -1;
      while (true) {
        yield ++i;
      }
    })();

    expect([...iterator.take(5)]).toStrictEqual([0, 1, 2, 3, 4]);
  });

  it("throws on consumption when the underlying iterator throws", () => {
    const iterator = (function* () {
      yield 3;
      throw new Error();
    })();

    const limit = 5;

    expect(() => iterator.take(limit)).not.toThrow();
    expect(() => [...iterator.take(limit)]).toThrow();
  });

  it("doesn't reach errors in the underlying iterator that happen past the limit of elements taken", () => {
    const iterator = (function* () {
      yield 3;
      throw new Error();
    })();

    expect([...iterator.take(1)]).toStrictEqual([3]);
  });

  it.each([NaN, -1, 0.5, -0.5, Infinity, -Infinity])(
    "throws a RangeError on instantiation when limit is %p",
    (value) => {
      const iterator = [].values();
      expect(() => iterator.take(value)).toThrow(RangeError);
    },
  );
});
