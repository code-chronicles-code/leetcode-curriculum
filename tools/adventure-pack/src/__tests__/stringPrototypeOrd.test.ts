import { describe, expect, it } from "@jest/globals";

import "../stringPrototypeOrd";

describe("String.prototype.ord", () => {
  it("gets the ASCII code of basic ASCII characters", () => {
    expect("A".ord()).toBe(65);
    expect("a".ord()).toBe(97);
    expect("m".ord()).toBe(109);
    expect("\n".ord()).toBe(10);
    expect("=".ord()).toBe(61);
    expect("~".ord()).toBe(126);
    expect(" ".ord()).toBe(32);
    expect("0".ord()).toBe(48);
  });

  it("looks at the first character of multi-character strings", () => {
    expect("hi".ord()).toBe(104);
    expect(" ?!".ord()).toBe(32);
  });

  it("handles empty string", () => {
    expect("".ord()).toBe(undefined);
  });

  it("handles emoji", () => {
    expect("🤪".ord()).toBe(0x1f92a);
    expect("🤖".ord()).toBe(0x1f916);
    expect("🦄".ord()).toBe(0x1f984);
  });
});
