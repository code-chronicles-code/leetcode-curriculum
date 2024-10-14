export function or<T>(values: readonly [T, ...T[]]): T;
export function or<T>(values: Iterable<T>): T | undefined;
export function or<T>(values: Iterable<T>): T | undefined {
  let value: T | undefined;

  for (value of values) {
    if (value) {
      return value;
    }
  }

  return value;
}
