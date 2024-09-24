import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("Number.prototype.chr", () => {
  describe("ASCII range", () => {
    it.each([
      { codePoint: 65, expected: "A" },
      { codePoint: 10, expected: "\n" },
      { codePoint: 61, expected: "=" },
      { codePoint: 126, expected: "~" },
      { codePoint: 32, expected: " " },
      { codePoint: 48, expected: "0" },
      { codePoint: 0x24, expected: "$" },
    ])('($codePoint).chr() === "$expected"', ({ codePoint, expected }) => {
      expect(codePoint.chr()).toBe(expected);
    });
  });

  describe("emoji", () => {
    it.each([
      { codePoint: 129302, expected: "🤖" },
      { codePoint: 129412, expected: "🦄" },
      { codePoint: 0x1f303, expected: "🌃" },
      { codePoint: 0x1f92a, expected: "🤪" },
    ])('($codePoint).chr() === "$expected"', ({ codePoint, expected }) => {
      expect(codePoint.chr()).toBe(expected);
    });
  });

  describe("edge cases", () => {
    it("converts zero to null character", () => {
      expect((0).chr()).toBe("\0");
    });

    it.each([-1, 11120651, Infinity, -Infinity, 1.5, 1e-2, 0xffffff, NaN])(
      "throws RangeError for number outside Unicode range %p",
      (num) => {
        expect(num.chr).toBeInstanceOf(Function);

        expect(() => num.chr()).toThrow(RangeError);
      },
    );
  });
});
