import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Iterator.prototype.reduce", () => {
  it("can reduce an Array's values to a sum", () => {
    const array = [2, -4, 6, -8, 10];
    expect(array.values().reduce((a, b) => a + b)).toBe(6);
  });
});
