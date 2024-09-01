import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Number.prototype.chr", () => {
  describe("convert ASCII codepoint to ASCII string", () => {
    it.each([
      { codepoint: 65, expected: "A" },
      { codepoint: 10, expected: "\n" },
      { codepoint: 61, expected: "=" },
      { codepoint: 126, expected: "~" },
      { codepoint: 32, expected: " " },
      { codepoint: 48, expected: "0" },
    ])(
      "convert ASCII codepoint $codepoint to ASCII string $expected",
      ({ codepoint, expected }) => {
        expect(codepoint.chr()).toBe(expected);
      },
    );
  });

  describe("convert codepoint to emoji", () => {
    it.each([
      { codepoint: 129302, expected: "🤖" },
      { codepoint: 129412, expected: "🦄" },
    ])(
      "convert codepoint $codepoint to emoji $expected",
      ({ codepoint, expected }) => {
        expect(codepoint.chr()).toBe(expected);
      },
    );
  });

  describe("convert hex codepoint to string", () => {
    it.each([
      { codepoint: 0x404, expected: "Є" },
      { codepoint: 0x24, expected: "$" },
      { codepoint: 0x1f303, expected: "🌃" },
      { codepoint: 0x1f92a, expected: "🤪" },
    ])(
      "convert hex codepoint $codepoint to string $expected",
      ({ codepoint, expected }) => {
        expect(codepoint.chr()).toBe(expected);
      },
    );
  });

  describe("handle edgecases appropiately by returning null char or throwing error.", () => {
    it("convert zero to null character", () => {
      expect((0).chr()).toBe("\0");
    });

    it.each([
      { edgecase: -1 },
      { edgecase: 11120651 },
      { edgecase: Infinity },
      { edgecase: -Infinity },
      { edgecase: 1.5 },
      { edgecase: 1e-2 },
      { edgecase: 0xffffff },
    ])(
      "handle number $edgecase outside unicode range by throwing range error",
      ({ edgecase }) => {
        expect(() => edgecase.chr()).toThrow(RangeError);
      },
    );

    it("handles incompatible types by throwing range error", () => {
      expect(() => Number(undefined).chr()).toThrow(RangeError);
      expect(() => Number(NaN).chr()).toThrow(RangeError);
    });
  });
});
