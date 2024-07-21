import { describe, expect, it } from "@jest/globals";

import "./index";

const VALUES = [
  42,
  -5.4,
  0,
  -0,
  "hi",
  true,
  false,
  null,
  undefined,
  NaN,
  Infinity,
  {},
  [],
  new Set(),
  new Map(),
  Symbol(undefined),
];

describe("Function.returnThis", () => {
  it("returns the object it's invoked on", () => {
    const symbol = Symbol("!");
    const obj = {
      foo: Function.returnThis,
      bar: Function.returnThis,
      returnThis: Function.returnThis,
      [symbol]: Function.returnThis,
    };

    expect(obj.foo()).toBe(obj);
    expect(obj.bar()).toBe(obj);
    expect(obj.returnThis()).toBe(obj);
    expect(obj[symbol]()).toBe(obj);
  });

  it("returns undefined when not invoked on any object", () => {
    const { returnThis } = Function;
    expect(returnThis()).toBeUndefined();
  });

  it("returns the Function constructor when invoked as defined", () => {
    expect(Function.returnThis()).toBe(Function);
  });

  it.each(VALUES)("can .apply(%p)", (self) => {
    expect(Function.returnThis.apply(self)).toBe(self);
  });

  it.each(VALUES)("can .bind(%p)", (self) => {
    expect(Function.returnThis.bind(self)()).toBe(self);
  });

  it.each(VALUES)("can .call(%p)", (self) => {
    expect(Function.returnThis.call(self)).toBe(self);
  });
});
