import { describe, expect, it } from "@jest/globals";

import { stripPrefix } from "../stripPrefix";

describe("stripPrefix", () => {
  it("removes the prefix if it exists", () => {
    expect(stripPrefix("hello world", "hello")).toBe(" world");
  });

  it("returns an unmodified string if the prefix doesn't exist", () => {
    expect(stripPrefix("hello world", "goodbye")).toBe("hello world");
  });

  it("returns an empty string if the entire string is the prefix", () => {
    expect(stripPrefix("hello", "hello")).toBe("");
  });

  it("tolerates an empty string", () => {
    expect(stripPrefix("", "prefix")).toBe("");
  });

  it("complains about an empty prefix", () => {
    expect(() => stripPrefix("hello", "")).toThrow();
  });

  it("respects case", () => {
    expect(stripPrefix("Hello World", "hello")).toBe("Hello World");
  });

  it("tolerates prefixes that are longer than the string", () => {
    expect(stripPrefix("hi", "hello")).toBe("hi");
  });

  it("works with multiline strings", () => {
    expect(stripPrefix("hello\nworld\nhow\nare\nyou", "hello\nwo")).toBe(
      "rld\nhow\nare\nyou",
    );
  });

  it("only removes the prefix once", () => {
    expect(stripPrefix("hahaha", "ha")).toBe("haha");
  });

  it("works with emojis", () => {
    expect(stripPrefix("🍎apple", "🍎")).toBe("apple");
    expect(stripPrefix("🍌banana", "🍌")).toBe("banana");
    expect(stripPrefix("grapes🍇🍇", "grapes")).toBe("🍇🍇");
    expect(stripPrefix("🍉watermelon🍉", "🍉watermelon")).toBe("🍉");
  });
});
