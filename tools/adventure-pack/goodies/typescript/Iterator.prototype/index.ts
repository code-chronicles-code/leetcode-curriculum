import "../Object.getUnsafe";

export const iteratorPrototype = Object.getUnsafe(globalThis, [
  "Iterator",
  "prototype",
]) as Iterator<unknown, unknown, unknown>;
