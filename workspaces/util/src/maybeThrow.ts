export function maybeThrow(errors: readonly [unknown, unknown[]]): never;
export function maybeThrow(errors: readonly unknown[]): void;
export function maybeThrow(errors: readonly unknown[]): void {
  if (errors.length === 0) {
    return;
  }

  // TODO: wrap errors[0] in an Error object if it's not an error already
  throw errors.length === 1 ? errors[0] : new AggregateError(errors);
}
