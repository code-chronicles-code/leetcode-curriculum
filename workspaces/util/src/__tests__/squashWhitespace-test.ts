import { describe, expect, it } from "@jest/globals";

import { squashWhitespace } from "../squashWhitespace.ts";

describe("squashWhitespace", () => {
  it("squashes whitespace between words if it exists", () => {
    expect(squashWhitespace("hello   world")).toBe("hello world");
  });

  it("trims whitespace at the end of the string", () => {
    expect(squashWhitespace("hello world        ")).toBe("hello world");
  });

  it("trims whitespace at the beginginng of the string", () => {
    expect(squashWhitespace("         hello world")).toBe("hello world");
  });

  it("squashes whitespace in multiple parts of the string", () => {
    expect(squashWhitespace("         hello     world    ")).toBe(
      "hello world",
    );
  });

  it("transforms non-space whitespace to spaces", () => {
    expect(squashWhitespace("hello\t\t\nworld\t\n\f\r!!")).toBe(
      "hello world !!",
    );
  });

  it("leaves string un changed if whitespace is already squashed", () => {
    expect(squashWhitespace("hello world !")).toBe("hello world !");
  });

  it("accepts an empty string", () => {
    expect(squashWhitespace("")).toBe("");
  });

  it("returns empty string when input is whitespace only", () => {
    expect(squashWhitespace("        ")).toBe("");
  });

  it("works with non-ASCII whitespace characters", () => {
    expect(
      squashWhitespace("hello\u00A0\u1680\u2001\u2003world\u2005\u2008!!"),
    ).toBe("hello world !!");
  });

  it("works with non-ASCII line break characters", () => {
    expect(squashWhitespace("hello\u000B\u000Cworld\u000D!!")).toBe(
      "hello world !!",
    );
  });

  it("respects case", () => {
    expect(squashWhitespace(" Hello   wOrLd  ")).toBe("Hello wOrLd");
  });

  it("works with emojis", () => {
    expect(squashWhitespace("🍎   apple")).toBe("🍎 apple");
    expect(squashWhitespace("🍌banana")).toBe("🍌banana");
    expect(squashWhitespace("grapes 🍇 🍇   ")).toBe("grapes 🍇 🍇");
  });
});
