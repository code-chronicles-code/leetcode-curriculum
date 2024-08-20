import { describe, expect, it } from "@jest/globals";

import { squashWhitespace } from "../squashWhitespace";

describe("squashWhitespace", () => {
  it("removes whitespace between words if it exists", () => {
    expect(squashWhitespace("hello   world")).toBe("hello world");
  });

  it("removes whitespace at the end of the string", () => {
    expect(squashWhitespace("hello world        ")).toBe("hello world");
  });

  it("removes whitespace at the beginginng of the string", () => {
    expect(squashWhitespace("         hello world")).toBe("hello world");
  });

  it("removes nothing and keep the string unchanged", () => {
    expect(squashWhitespace("hello world !")).toBe("hello world !");
  });

  it("returns empty string when empty string is given", () => {
    expect(squashWhitespace("")).toBe("");
  });

  it("respects case", () => {
    expect(squashWhitespace(" Hello   World  ")).toBe("Hello World");
  });

  it("works with emojis", () => {
    expect(squashWhitespace("🍎   apple")).toBe("🍎 apple");
    expect(squashWhitespace("🍌banana")).toBe("🍌banana");
    expect(squashWhitespace("grapes 🍇 🍇   ")).toBe("grapes 🍇 🍇");
  });
});
