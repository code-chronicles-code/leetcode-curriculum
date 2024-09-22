import { describe, expect, it } from "@jest/globals";

import { stripPrefix } from "../stripPrefix.ts";

describe("stripPrefix", () => {
  it("removes the prefix if it exists", () => {
    expect(stripPrefix("hello world", "hello")).toBe(" world");
  });

  it("returns an unmodified string if the prefix doesn't exist", () => {
    expect(stripPrefix("hello world", "mundo")).toBe("hello world");
  });

  it("returns an unmodified string if the prefix is not at the start of the string", () => {
    expect(stripPrefix("hello world", "world")).toBe("hello world");
    expect(stripPrefix("hello world, how are you", "world")).toBe(
      "hello world, how are you",
    );
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
    expect(stripPrefix("Hello World", "Hello")).toBe(" World");
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
    expect(stripPrefix("alfalfa", "alf")).toBe("alfa");
    expect(stripPrefix("couscous", "cous")).toBe("cous");
  });

  it("works with emojis", () => {
    expect(stripPrefix("🍎apple", "🍎")).toBe("apple");
    expect(stripPrefix("🍌banana", "🍌")).toBe("banana");
    expect(stripPrefix("grapes🍇🍇", "grapes")).toBe("🍇🍇");
    expect(stripPrefix("🍉watermelon🍉", "🍉watermelon")).toBe("🍉");
  });
});
