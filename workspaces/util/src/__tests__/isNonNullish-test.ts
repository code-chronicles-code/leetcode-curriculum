// TODO: keep in sync with the goody test

import { describe, expect, it } from "@jest/globals";

import { isNonNullish } from "../isNonNullish.ts";

describe("isNonNullish", () => {
  it.each([[], {}, new Set(), new Map(), "hi", 4, Symbol(undefined)])(
    "returns true for non-nullish values",
    (value) => {
      expect(isNonNullish(value)).toBe(true);
    },
  );

  it("returns false for null and undefined", () => {
    expect(isNonNullish(null)).toBe(false);
    expect(isNonNullish(undefined)).toBe(false);
  });

  it.each([false, "", NaN, 0, -0, 0n, -0n])(
    "returns true for non-nullish falsy value %p",
    (value) => {
      expect(isNonNullish(value)).toBe(true);
    },
  );
});
