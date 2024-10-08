export function addAllToSet<T>(set: Set<T>, values: Iterable<T>): void {
  for (const value of values) {
    set.add(value);
  }
}
