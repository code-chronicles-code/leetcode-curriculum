import { describe, expect, it } from "@jest/globals";

import "../arrayPrototypeSlidingWindows";

describe("Array.prototype.slidingWindows", () => {
  it("can slide over an array", () => {
    const windows = [3, 1, 4, 1, 5, 9].slidingWindows(2);

    expect([...windows.next().value!]).toEqual([3, 1]);
    expect([...windows.next().value!]).toEqual([1, 4]);
    expect([...windows.next().value!]).toEqual([4, 1]);
    expect([...windows.next().value!]).toEqual([1, 5]);
    expect([...windows.next().value!]).toEqual([5, 9]);
  });

  // TODO: add more tests!
});
