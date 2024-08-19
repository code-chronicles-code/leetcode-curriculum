import { describe, expect, it } from "@jest/globals";

import { squashWhitespace } from "../squashWhitespace";

describe("squashWhitespace", () => {
  it("removes whitespaces between words if it exists", () => {
    expect(squashWhitespace("hello   world")).toBe("hello world");
  });

  it("removes whitespaces at the end of the string", () => {
    expect(squashWhitespace("hello world        ")).toBe("hello world");
  });

  it("removes whitespaces at the beginginng of the string", () => {
    expect(squashWhitespace("         hello world")).toBe("hello world");
  });

  it("nothing should be changed", () => {
    expect(squashWhitespace("hello world !")).toBe("hello world !");
  });

  it("empty string", () => {
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