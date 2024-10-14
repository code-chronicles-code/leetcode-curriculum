import type { Writable } from "type-fest";

export function mapArrayAtIndex<
  TArray extends readonly unknown[],
  TIndex extends number,
>(
  arr: TArray,
  index: TIndex,
  mapFn: (oldValue: TArray[TIndex]) => TArray[TIndex],
): Writable<TArray> {
  if (index < 0) {
    throw new RangeError(
      "Mapping out of bounds index " +
        index +
        " for array of length " +
        arr.length +
        ".",
    );
  }

  return arr.map((value, i) =>
    i === index ? mapFn(value) : value,
  ) as unknown as Writable<TArray>;
}
