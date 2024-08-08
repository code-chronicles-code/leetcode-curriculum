import { describe, expect, it } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype";
delete (iteratorPrototype as unknown as Record<string, unknown>).flatMap;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index";

describe("Iterator.prototype.flatMap", () => {
  it("can flatten an Array's values()", () => {
    const array = [-1, -5, 5, 3, 7];
    const generator = function* (
      p: number,
    ): Generator<number, void, undefined> {
      yield p;
      yield p * 2;
    };

    const flatMapResult = array.values().flatMap(generator);

    expect(flatMapResult.next().value).toBe(-1);
    expect(flatMapResult.next().value).toBe(-2);
    expect(flatMapResult.next().value).toBe(-5);
    expect(flatMapResult.next().value).toBe(-10);
    expect(flatMapResult.next().value).toBe(5);
    expect(flatMapResult.next().value).toBe(10);
    expect(flatMapResult.next().value).toBe(3);
    expect(flatMapResult.next().value).toBe(6);
    expect(flatMapResult.next().value).toBe(7);
    expect(flatMapResult.next().value).toBe(14);
    expect(flatMapResult.next().done).toBe(true);
  });
});
