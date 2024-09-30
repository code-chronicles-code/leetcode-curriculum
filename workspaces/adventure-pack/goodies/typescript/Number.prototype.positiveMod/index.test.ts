import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("Number.prototype.positiveMod", () => {
  describe("positive integers", () => {
    it.each([[5, 3, 2]])(
      "%p %% %p === %p",
      (dividend: number, divisor: number, remainder: number) => {
        expect(dividend.positiveMod(divisor)).toBe(remainder);
      },
    );
  });

  describe("negative dividend", () => {
    it.each([[-5, 3, 1]])(
      "%p %% %p === %p",
      (dividend: number, divisor: number, remainder: number) => {
        expect(dividend.positiveMod(divisor)).toBe(remainder);
      },
    );
  });

  describe("negative divisor", () => {
    it.each([
      [5, -3, 2],
      [-5, -3, 1],
    ])(
      "%p %% %p === %p",
      (dividend: number, divisor: number, remainder: number) => {
        expect(dividend.positiveMod(divisor)).toBe(remainder);
      },
    );
  });

  describe("zero divisor", () => {
    it.each([
      [5, 0, NaN],
      [-5, 0, NaN],
      [5, -0, NaN],
      [-5, -0, NaN],
    ])(
      "%p %% %p === %p",
      (dividend: number, divisor: number, remainder: number) => {
        expect(dividend.positiveMod(divisor)).toBe(remainder);
      },
    );
  });
});
