export function mapArrayAtIndex<T>(
  arr: readonly T[],
  index: number,
  mapFn: (oldValue: T) => T,
): T[] {
  if (index < 0) {
    throw new RangeError(
      "Mapping out of bounds index " +
        index +
        " for array of length " +
        arr.length +
        ".",
    );
  }

  return arr.map((value, i) => (i === index ? mapFn(value) : value));
}
