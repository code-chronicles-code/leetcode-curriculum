export function swap<T>(array: T[], i: number, j: number): void {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}
