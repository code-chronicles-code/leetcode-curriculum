export function iteratorToIterable<T>(iterator: Iterator<T>): Iterable<T> {
  if (Object.hasOwn(iterator, Symbol.iterator)) {
    return iterator as unknown as Iterable<T>;
  }
  return { [Symbol.iterator]: () => iterator };
}
