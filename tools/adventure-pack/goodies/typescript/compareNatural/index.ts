export function compareNatural<T>(a: T, b: T): number {
  if (
    (typeof a === "number" && typeof b === "number") ||
    (typeof a === "string" && typeof b === "string") ||
    (typeof a === "bigint" && typeof b === "bigint")
  ) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length && i < b.length; ++i) {
      const compareResult = compareNatural(a[i], b[i]);
      if (compareResult !== 0) {
        return compareResult;
      }
    }

    return a.length - b.length;
  }

  throw new Error("Comparing mismatched types!");
}
