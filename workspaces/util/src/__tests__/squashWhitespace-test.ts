import { describe, expect, it } from "@jest/globals";

import { squashWhitespace } from "../squashWhitespace.ts";

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

  it("removes whitespace at the beginginng, middle and end of the string", () => {
    expect(squashWhitespace("         hello     world    ")).toBe(
      "hello world",
    );
  });

  it("removes nothing and keep the string unchanged", () => {
    expect(squashWhitespace("hello world !")).toBe("hello world !");
  });

  it("returns empty string when empty string is given", () => {
    expect(squashWhitespace("")).toBe("");
  });

  it("returns empty string when whitespace only given", () => {
    expect(squashWhitespace("        ")).toBe("");
  });

  it("works with tabs and new lines", () => {
    expect(squashWhitespace("hello\tworld\n!!")).toBe("hello world !!");
  });

  it("works with different whitespace characters", () => {
    expect(
      squashWhitespace("hello\u00A0\u1680\u2001\u2003world\u2005\u2008!!"),
    ).toBe("hello world !!");
  });

  it("works with different line break characters", () => {
    expect(squashWhitespace("hello\u000B\u000Cworld\u000D!!")).toBe(
      "hello world !!",
    );
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
