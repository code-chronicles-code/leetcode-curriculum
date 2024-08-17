export function popMany<T>(array: T[], count: number): T[] {
  const res: T[] = [];
  while (array.length > 0 && res.length < count) {
    // The cast is safe because we checked the size of the array.
    // Not using `nullthrows` because `T` could be a union that includes `undefined`.
    res.push(array.pop() as T);
  }

  res.reverse();
  return res;
}
