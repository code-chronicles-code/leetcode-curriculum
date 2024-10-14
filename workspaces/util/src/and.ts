export function and<T>(values: readonly [T, ...T[]]): T;
export function and<T>(values: Iterable<T>): T | undefined;
export function and<T>(values: Iterable<T>): T | undefined {
  let value: T | undefined;

  for (value of values) {
    if (!value) {
      return value;
    }
  }

  return value;
}
