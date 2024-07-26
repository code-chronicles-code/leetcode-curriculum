export function first<T>(array: readonly [T, ...T[]]): T;
export function first<T>(array: readonly T[]): T | undefined;
export function first<T>(array: readonly T[]): T | undefined {
  return array[0];
}
