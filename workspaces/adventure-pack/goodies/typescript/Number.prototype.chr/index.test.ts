import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Number.prototype.chr", () => {
  it("convert ASCII codepoint to ASCII string", () => {
    expect(Number(65).chr()).toBe("A");
  });
});