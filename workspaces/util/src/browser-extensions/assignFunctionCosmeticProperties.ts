/**
 * Copies some of the cosmetic properties (`name`, `length`) from the `source`
 * function to the `target` function. Returns the `target`.
 */
export function assignFunctionCosmeticProperties<T extends Function>(
  target: T,
  source: Function,
): T {
  return Object.defineProperties(
    target,
    Object.fromEntries(
      ["length", "name"]
        .map((property) => [
          property,
          Object.getOwnPropertyDescriptor(source, property),
        ])
        .filter((entry) => entry[1]),
    ),
  );
}
