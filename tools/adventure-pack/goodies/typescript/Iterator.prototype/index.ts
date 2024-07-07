export const iteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf([].values()),
) as Iterator<unknown, unknown, unknown>;
