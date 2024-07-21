export function nullthrows<T>(
  value: T | null | undefined,
  errorMessage: string = "Unexpected nullish value!",
): T {
  if (value == null) {
    throw new Error(errorMessage);
  }
  return value;
}
