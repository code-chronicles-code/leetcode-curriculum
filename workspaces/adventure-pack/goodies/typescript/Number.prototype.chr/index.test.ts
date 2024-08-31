import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Number.prototype.chr", () => {
  it("convert ASCII codepoint to ASCII string", () => {
    expect(Number(65).chr()).toBe("A");
    expect(Number(10).chr()).toBe("\n");
    expect(Number(61).chr()).toBe("=");
    expect(Number(126).chr()).toBe("~");
    expect(Number(32).chr()).toBe(" ");
    expect(Number(48).chr()).toBe("0");
  });

  it("convert codepoint to emoji", () => {
    expect(Number(129302).chr()).toBe("🤖");
    expect(Number(129412).chr()).toBe("🦄");
  });

  it("convert hex codepoint to string", () => {
    expect(Number(0x404).chr()).toBe("Є");
    expect(Number(0x24).chr()).toBe("$");
    expect(Number(0x1f303).chr()).toBe("🌃");
    expect(Number(0x1f92a).chr()).toBe("🤪");
  });

  it("convert zero to null character", () => {
    expect((0).chr()).toBe("\0");
  });

  it("handle numbers outside unicode range by throwing range error", () => {
    expect(() => Number(-1).chr()).toThrow(RangeError);
    expect(() => Number(11120651).chr()).toThrow(RangeError);
    expect(() => Number(Infinity).chr()).toThrow(RangeError);
    expect(() => Number(-Infinity).chr()).toThrow(RangeError);
    expect(() => Number("_").chr()).toThrow(RangeError);
    expect(() => Number(1.5).chr()).toThrow(RangeError);
    expect(() => Number(1e-2).chr()).toThrow(RangeError);
    expect(() => Number(0xffffff).chr()).toThrow(RangeError);
  });

  it("handles incompatible types by throwing range error", () => {
    expect(() => Number(undefined).chr()).toThrow(RangeError);
    expect(() => Number(NaN).chr()).toThrow(RangeError);
  });
});
