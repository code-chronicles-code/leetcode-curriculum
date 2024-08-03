import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
import "../Iterator.prototype.take";

delete (iteratorPrototype as unknown as Record<string, unknown>).drop;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.drop", () => {
  it("drops the specified number of elements from the iterator", () => {
    const result = Array.from([10, 22, 33, 47, 58].values().drop(3));
    expect(result).toStrictEqual([47, 58]);
  });

  it("returns an empty iterator if the specified number is greater than the iterator length", () => {
    const result = Array.from([10, 22, 33].values().drop(5));
    expect(result).toStrictEqual([]);
  });

  it("returns the full iterator if the specified number is 0", () => {
    const result = Array.from(["cat", "dog", "otter", "bear"].values().drop(0));
    expect(result).toStrictEqual(["cat", "dog", "otter", "bear"]);
  });

  it("returns an empty iterator for an empty iterator", () => {
    const result = Array.from([].values().drop(3));
    expect(result).toStrictEqual([]);
  });

  it("drops the specified number of elements from an infinite iterator", () => {
    function* infiniteNumbers() {
      let i = -1;
      while (true) {
        yield ++i;
      }
    }
    // Drop the first 2 elements, then take the next 5 to avoid infinte loop
    const iterator = infiniteNumbers().drop(2).take(5);
    const result = [...iterator];

    expect(result).toStrictEqual([2, 3, 4, 5, 6]);
  });

  it("can drop characters from a string", () => {
    const s = "Hello Universe";

    const result = [...s[Symbol.iterator]().drop(6)].join("");
    expect(result).toStrictEqual("Universe");
  });

  it("correctly drops the first limit entries from the animal map", () => {
    const animalMap = new Map([
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
    ]);

    const entriesIterator = animalMap.entries();
    const result = [...entriesIterator.drop(5)];
    expect(result).toStrictEqual([
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

  it("correctly drops the first limit entries from the animal set", () => {
    const animalList = [
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
      "lion",
      "panda",
      "tiger",
    ];

    const animalSet = new Set(animalList);
    console.log(animalSet);

    const valuesIterator = animalSet.values();
    const result = [...valuesIterator.drop(4)];

    expect(result).toStrictEqual([
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
    ]);
  });

  it.each([1, 0, 7, 2, 100])(
    "throws an error after attempting to drop %p elements from an iterator that errors",
    (value) => {
      function* generateValues() {
        yield "Maine coon";
        throw new Error("An error occurred");
      }

      expect(() => {
        [...generateValues().drop(value)];
      }).toThrow("An error occurred");
    },
  );

  it("skips over caught errors in the underlying iterator and continues yielding values", () => {
    function* generateValues() {
      yield "Maine coon";
      try {
        throw new Error("An error occurred");
      } catch (e) {
        console.error(e);
      }

      yield "Savannah cat";
    }
    const result = [...generateValues().drop(1)];
    expect(result).toStrictEqual(["Savannah cat"]);
  });

  it.each([NaN, -1, 0.5, -0.5, Infinity, -Infinity])(
    "throws a RangeError when limit is %p",
    (value) => {
      expect(() => {
        [].values().drop(value);
      }).toThrow(RangeError);
    },
  );
});
