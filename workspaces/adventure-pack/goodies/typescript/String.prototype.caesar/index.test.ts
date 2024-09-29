import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("String.prototype.caesar", () => {
  it("defaults to the classic Caesar cipher", () => {
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".caesar()).toBe(
      "BCDEFGHIJKLMNOPQRSTUVWXYZA",
    );
    expect("abcdefghijklmnopqrstuvwxyz".caesar()).toBe(
      "bcdefghijklmnopqrstuvwxyza",
    );
  });

  it("can rotate backwards", () => {
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".caesar(-1)).toBe(
      "ZABCDEFGHIJKLMNOPQRSTUVWXY",
    );
    expect("abcdefghijklmnopqrstuvwxyz".caesar(-1)).toBe(
      "zabcdefghijklmnopqrstuvwxy",
    );
  });

  it("ignores non-Latin alphabet characters", () => {
    expect("Alea iacta est!".caesar(12)).toBe("Mxqm umofm qef!");
    expect("Veni, vidi, vici".caesar(2)).toBe("Xgpk, xkfk, xkek");
    expect("Et tu, Brute?".caesar(-1)).toBe("Ds st, Aqtsd?");
    expect("Civis Romanus sum.".caesar()).toBe("Djwjt Spnbovt tvn.");
  });

  // TODO: test ROT-13

  // TODO: test Unicode characters

  // TODO: test inverse

  // TODO: more test cases for the existing tests

  // TODO: test zero
});
