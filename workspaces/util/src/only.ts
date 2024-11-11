import invariant from "invariant";
import nullthrows from "nullthrows";

export function only<T>(iterable: Iterable<T>): T {
  if (Array.isArray(iterable)) {
    const { length } = iterable;
    invariant(
      length === 1,
      "Given array has length %s, not 1 as expected!",
      length,
    );
    return iterable[0];
  }

  let elementBox: { element: T } | null = null;
  for (const element of iterable) {
    invariant(elementBox == null, "Iterable had multiple elements!");
    elementBox = { element };
  }

  return nullthrows(elementBox, "Empty iterable!").element;
}
