import { describe, expect, it } from "@jest/globals";

import "./index.ts";

describe("String.prototype.rot", () => {
  it("defaults to Caesar cipher", () => {
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".rot()).toBe(
      "BCDEFGHIJKLMNOPQRSTUVWXYZA",
    );
    expect("abcdefghijklmnopqrstuvwxyz".rot()).toBe(
      "bcdefghijklmnopqrstuvwxyza",
    );
  });

  it("can rotate backwards", () => {
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".rot(-1)).toBe(
      "ZABCDEFGHIJKLMNOPQRSTUVWXY",
    );
    expect("abcdefghijklmnopqrstuvwxyz".rot(-1)).toBe(
      "zabcdefghijklmnopqrstuvwxy",
    );
  });

  it("ignores non-Latin alphabet characters", () => {
    expect("Alea iacta est!".rot(12)).toBe("Mxqm umofm qef!");
    expect("Veni, vidi, vici".rot(2)).toBe("Xgpk, xkfk, xkek");
    expect("Et tu, Brute?".rot(-1)).toBe("Ds st, Aqtsd?");
    expect("Civis Romanus sum.".rot()).toBe("Djwjt Spnbovt tvn.");
  });

  // TODO: test ROT-13

  // TODO: test Unicode characters

  // TODO: test inverse

  // TODO: more test cases for the existing tests

  // TODO: test zero
});
