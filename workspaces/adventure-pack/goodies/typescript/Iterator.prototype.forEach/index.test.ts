import { describe, expect, it, jest } from "@jest/globals";

import { iteratorPrototype } from "../Iterator.prototype/index.ts";
delete (iteratorPrototype as unknown as Record<string, unknown>).forEach;
// eslint-disable-next-line import-x/first -- This has to happen after we delete the built-in implementation.
import "./index.ts";

describe("Iterator.prototype.forEach", () => {
  it("calls the callback function for each array element", () => {
    const array = [2, 3, 5, 7];
    const callback = jest.fn();

    array.values().forEach(callback);

    expect(callback).toHaveBeenCalledTimes(array.length);
  });

  it("handles an empty iterator", () => {
    const callback = jest.fn();

    [].values().forEach(callback);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should execute side effects correctly", () => {
    const array = [2, 3, 5, 7];
    let sum = 0;

    array.values().forEach((element) => {
      sum += element;
    });

    expect(sum).toBe(17);
  });

  it("calls the callback for each map entry", () => {
    const map = new Map([
      ["car", "red"],
      ["bus", "yellow"],
      ["plane", "white"],
    ]);
    const callback = jest.fn();

    map.entries().forEach(callback);
    expect(callback).toHaveBeenCalledTimes(map.size);
    expect(callback.mock.calls).toStrictEqual([
      [["car", "red"], 0],
      [["bus", "yellow"], 1],
      [["plane", "white"], 2],
    ]);
  });

  it("calls the callback for each element in a set", () => {
    const set = new Set([2, 3, 3, 4, 5, 5, 6]);
    const callback = jest.fn();

    set.values().forEach(callback);
    expect(callback).toHaveBeenCalledTimes(set.size);
    expect(callback.mock.calls).toStrictEqual([
      [2, 0],
      [3, 1],
      [4, 2],
      [5, 3],
      [6, 4],
    ]);
  });

  it("should not fail if the callback returns a value", () => {
    const array = [2, 3, 5, 7];
    const callback = () => "ignored";

    expect(() => {
      array.values().forEach(callback);
    }).not.toThrow();
  });
});
