import { describe, expect, it } from "@jest/globals";

import "../Iterator.prototype.take/index.ts";

import { iteratorPrototype } from "../Iterator.prototype/index.ts";
delete (iteratorPrototype as unknown as Record<string, unknown>).drop;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Iterator.prototype.drop", () => {
  it("drops the specified number of elements from the iterator", () => {
    const iterator = [10, 22, 33, 47, 58].values().drop(3);
    expect([...iterator]).toStrictEqual([47, 58]);
  });

  it("returns an empty iterator if the limit is greater than the iterator length", () => {
    const iterator = [10, 22, 33].values().drop(5);
    expect([...iterator]).toStrictEqual([]);
  });

  it("returns the full iterator if the limit is 0", () => {
    const iterator = ["cat", "dog", "otter", "bear"].values().drop(0);
    expect([...iterator]).toStrictEqual(["cat", "dog", "otter", "bear"]);
  });

  it("returns an empty iterator for an empty iterator", () => {
    const iterator = [].values().drop(3);
    expect([...iterator]).toStrictEqual([]);
  });

  it("drops the specified number of elements from an infinite iterator", () => {
    function* infiniteNumbers() {
      let i = -1;
      while (true) {
        yield ++i;
      }
    }

    // Drop the first 2 elements, then take the next 5 to avoid infinte loop.
    const iterator = infiniteNumbers().drop(2).take(5);
    expect([...iterator]).toStrictEqual([2, 3, 4, 5, 6]);
  });

  it("can drop characters from a string", () => {
    const iterator = "Hello Universe"[Symbol.iterator]().drop(6);
    expect([...iterator]).toStrictEqual("Universe".split(""));
  });

  it("correctly drops the first limit entries from a map", () => {
    const iterator = new Map([
      ["lion", "big cat"],
      ["elephant", "large mammal"],
      ["eagle", "bird of prey"],
      ["dolphin", "marine mammal"],
      ["panda", "bear"],
      ["koala", "marsupial"],
      ["kangaroo", "hopping marsupial"],
      ["penguin", "flightless bird"],
      ["shark", "ocean predator"],
      ["giraffe", "tall mammal"],
      ["zebra", "striped mammal"],
      ["owl", "nocturnal bird"],
      ["wolf", "pack animal"],
      ["tiger", "striped big cat"],
      ["crocodile", "reptile predator"],
      ["otter", "intelligent and cute"],
    ])
      .entries()
      .drop(5);

    expect([...iterator]).toStrictEqual([
      ["koala", "marsupial"],
      ["kangaroo", "hopping marsupial"],
      ["penguin", "flightless bird"],
      ["shark", "ocean predator"],
      ["giraffe", "tall mammal"],
      ["zebra", "striped mammal"],
      ["owl", "nocturnal bird"],
      ["wolf", "pack animal"],
      ["tiger", "striped big cat"],
      ["crocodile", "reptile predator"],
      ["otter", "intelligent and cute"],
    ]);
  });

  it("correctly drops the first limit entries from a set", () => {
    const iterator = new Set([
      "lion",
      "elephant",
      "eagle",
      "dolphin",
      "panda",
      "koala",
      "kangaroo",
      "penguin",
      "shark",
      "giraffe",
      "zebra",
      "owl",
      "wolf",
      "tiger",
      "crocodile",
      "otter",
      "elephant",
      "duck",
      "lion",
      "panda",
      "tiger",
    ])
      .values()
      .drop(4);

    expect([...iterator]).toStrictEqual([
      "panda",
      "koala",
      "kangaroo",
      "penguin",
      "shark",
      "giraffe",
      "zebra",
      "owl",
      "wolf",
      "tiger",
      "crocodile",
      "otter",
      "duck",
    ]);
  });

  it.each([1, 0, 7, 2, 100])(
    "throws an error after attempting to drop %p element(s) from an iterator that errors",
    (value) => {
      const iterator = (function* () {
        yield "Maine coon";
        throw new Error("An error occurred");
      })().drop(value);

      expect(() => [...iterator]).toThrow({ message: "An error occurred" });
    },
  );

  it("skips over caught errors in the underlying iterator and continues yielding values", () => {
    const iterator = (function* () {
      yield "Maine coon";
      try {
        throw new Error("An error occurred");
      } catch {}

      yield "Savannah cat";
    })().drop(1);

    expect([...iterator]).toStrictEqual(["Savannah cat"]);
  });

  it.each([NaN, -1, 0.5, -0.5, Infinity, -Infinity])(
    "throws a RangeError when limit is %p",
    (value) => {
      const iterator = [].values();
      expect(() => iterator.drop(value)).toThrow(RangeError);
    },
  );
});
