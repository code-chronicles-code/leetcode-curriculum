// TODO: keep in sync with the goody

export function isNonNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}
