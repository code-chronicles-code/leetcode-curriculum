export function invariant(
  condition: boolean,
  errorMessage: string = "Invariant violation!",
): asserts condition {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
