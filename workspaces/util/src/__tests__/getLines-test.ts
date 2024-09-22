import { describe, expect, it } from "@jest/globals";

import { getLines } from "../getLines.ts";

describe("getLines", () => {
  it("gets lines when the new line at the begining", () => {
    const result = getLines("\n hello\n world");

    expect([...result]).toStrictEqual(["\n", " hello\n", " world"]);
  });

  it("gets lines when the new line at the end", () => {
    const result = getLines("hello\nworld\n!!\n");

    expect([...result]).toStrictEqual(["hello\n", "world\n", "!!\n"]);
  });

  it("gets empty array when empty string is given", () => {
    const result = getLines("");

    expect([...result]).toStrictEqual([]);
  });

  it("gets a single line when a single line provided", () => {
    const result = getLines("hello world !");

    expect([...result]).toStrictEqual(["hello world !"]);
  });
});
