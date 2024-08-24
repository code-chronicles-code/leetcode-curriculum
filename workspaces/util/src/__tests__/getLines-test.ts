import { describe, expect, it } from "@jest/globals";

import { getLines } from "../getLines.ts";

describe("getLines", () => {
  it("splits text into lines", () => {
    const lines = getLines("some text\nsome more text\neven more text\n");

    expect([...lines]).toStrictEqual([
      "some text\n",
      "some more text\n",
      "even more text\n",
    ]);
  });

  it("does not require a newline after the last line", () => {
    const lines = getLines("some text\nsome text without a newline");

    expect([...lines]).toStrictEqual([
      "some text\n",
      "some text without a newline",
    ]);
  });

  it("works with empty lines", () => {
    const lines = getLines(
      "some text\n\n\n\nsome more text\n\n\neven more text\n\n\n",
    );

    expect([...lines]).toStrictEqual([
      "some text\n",
      "\n",
      "\n",
      "\n",
      "some more text\n",
      "\n",
      "\n",
      "even more text\n",
      "\n",
      "\n",
    ]);
  });

  it("handles a newline at the beginning of the string", () => {
    const lines = getLines("\n hello\n world");

    expect([...lines]).toStrictEqual(["\n", " hello\n", " world"]);
  });

  it("works with an empty string", () => {
    const lines = getLines("");

    expect([...lines]).toStrictEqual([]);
  });

  it.each(["hello", "hello world\n", "  hi!!! \n"])(
    "works with a single-line string",
    (line) => {
      const lines = getLines(line);

      expect([...lines]).toStrictEqual([line]);
    },
  );

  it("does something reasonable with Windows newlines", () => {
    const lines = getLines("hello\r\nworld\nfrom Windows\r\n");

    expect([...lines]).toStrictEqual([
      "hello\r\n",
      "world\n",
      "from Windows\r\n",
    ]);
  });
});
