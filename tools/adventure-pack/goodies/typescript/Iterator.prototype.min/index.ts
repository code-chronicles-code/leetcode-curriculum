import { compareNatural } from "../compareNatural";
import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    min(
      this: Iterator<T>,
      compareFn?: (a: T, b: T) => number,
      options?: { nanBehavior?: "avoid" | "compare" },
    ): T | undefined;
  }
}

iteratorPrototype.min = function <T>(
  this: Iterator<T>,
  compareFn: (a: T, b: T) => number = compareNatural,
  { nanBehavior = "avoid" }: { nanBehavior?: "avoid" | "compare" } = {},
): T | undefined {
  let res: T | undefined = undefined;

  let isFirst = true;
  for (const element of this.toIterable()) {
    if (
      isFirst ||
      compareFn(element, res as T) < 0 ||
      (nanBehavior === "avoid" && Number.isNaN(res) && !Number.isNaN(element))
    ) {
      res = element;
      isFirst = false;
    }
  }

  return res;
};
