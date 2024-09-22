import { describe, expect, it } from "@jest/globals";

import { stripSuffix } from "../stripSuffix.ts";

describe("stripSuffix", () => {
  it("removes the suffix if it exists", () => {
    expect(stripSuffix("hello world", "world")).toBe("hello ");
  });

  it("returns an unmodified string if the suffix doesn't exist", () => {
    expect(stripSuffix("hello world", "mundo")).toBe("hello world");
  });

  it("returns an unmodified string if the suffix is not at the end of the string", () => {
    expect(stripSuffix("hello world", "hello")).toBe("hello world");
    expect(stripSuffix("hello world, how are you", "world")).toBe(
      "hello world, how are you",
    );
  });

  it("returns an empty string if the entire string is the suffix", () => {
    expect(stripSuffix("hello", "hello")).toBe("");
  });

  it("tolerates an empty string", () => {
    expect(stripSuffix("", "suffix")).toBe("");
  });

  it("complains about an empty suffix", () => {
    expect(() => stripSuffix("hello", "")).toThrow();
  });

  it("respects case", () => {
    expect(stripSuffix("Hello World", "world")).toBe("Hello World");
    expect(stripSuffix("Hello World", "World")).toBe("Hello ");
  });

  it("tolerates suffixes that are longer than the string", () => {
    expect(stripSuffix("hi", "howdy")).toBe("hi");
  });

  it("works with multiline strings", () => {
    expect(stripSuffix("hello\nworld\nhow\nare\nyou", "how\nare\nyou")).toBe(
      "hello\nworld\n",
    );
  });

  it("only removes the suffix once", () => {
    expect(stripSuffix("banana", "na")).toBe("bana");
    expect(stripSuffix("couscous", "cous")).toBe("cous");
  });

  it("works with emojis", () => {
    expect(stripSuffix("🍎apple", "apple")).toBe("🍎");
    expect(stripSuffix("🍌banana", "🍌")).toBe("🍌banana");
    expect(stripSuffix("grapes🍇🍇", "🍇🍇")).toBe("grapes");
    expect(stripSuffix("🍉watermelon🍉", "watermelon🍉")).toBe("🍉");
  });
});
