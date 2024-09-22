import { describe, expect, it } from "@jest/globals";

import { stripSuffixOrThrow } from "../stripSuffixOrThrow.ts";

describe("stripSuffixOrThrow", () => {
  it("removes the suffix if it exists", () => {
    expect(stripSuffixOrThrow("hello world", "world")).toBe("hello ");
  });

  it("throws if the suffix doesn't exist", () => {
    expect(() => stripSuffixOrThrow("hello world", "mundo")).toThrow();
    expect(() => stripSuffixOrThrow("", "suffix")).toThrow();
    expect(() => stripSuffixOrThrow("hi", "howdy")).toThrow();
  });

  it("throws if the suffix is not at the end of the string", () => {
    expect(() => stripSuffixOrThrow("hello world", "hello")).toThrow();
    expect(() =>
      stripSuffixOrThrow("hello world, how are you", "world"),
    ).toThrow();
  });

  it("returns an empty string if the entire string is the suffix", () => {
    expect(stripSuffixOrThrow("hello", "hello")).toBe("");
  });

  it("complains about an empty suffix", () => {
    expect(() => stripSuffixOrThrow("hello", "")).toThrow();
  });

  it("respects case", () => {
    expect(() => stripSuffixOrThrow("Hello World", "world")).toThrow();
    expect(stripSuffixOrThrow("Hello World", "World")).toBe("Hello ");
  });

  it("works with multiline strings", () => {
    expect(
      stripSuffixOrThrow("hello\nworld\nhow\nare\nyou", "how\nare\nyou"),
    ).toBe("hello\nworld\n");
  });

  it("only removes the suffix once", () => {
    expect(stripSuffixOrThrow("banana", "na")).toBe("bana");
    expect(stripSuffixOrThrow("couscous", "cous")).toBe("cous");
  });

  it("works with emojis", () => {
    expect(stripSuffixOrThrow("🍎apple", "apple")).toBe("🍎");
    expect(() => stripSuffixOrThrow("🍌banana", "🍌")).toThrow();
    expect(stripSuffixOrThrow("grapes🍇🍇", "🍇🍇")).toBe("grapes");
    expect(stripSuffixOrThrow("🍉watermelon🍉", "watermelon🍉")).toBe("🍉");
  });
});
