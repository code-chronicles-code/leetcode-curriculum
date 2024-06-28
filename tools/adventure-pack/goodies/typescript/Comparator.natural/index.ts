/**
 * @goody {}
 */

import "../Object.setUnsafe";

declare global {
  interface Comparator {
    natural<T>(a: T, b: T): number;
  }

  const Comparator: Comparator;
}

Object.setUnsafe(globalThis, ["Comparator", "natural"], function <
  T,
>(a: T, b: T): number {
  if (
    (typeof a === "string" && typeof b === "string") ||
    (typeof a === "number" && typeof b === "number") ||
    (typeof a === "bigint" && typeof b === "bigint")
  ) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  throw new Error("Comparing mismatched types!");
});

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
