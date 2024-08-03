export function maybeThrow(errors: [unknown, unknown[]]): never;
export function maybeThrow(errors: unknown[]): void;
export function maybeThrow(errors: unknown[]): void {
  if (errors.length === 0) {
    return;
  }

  throw errors.length === 1 ? errors[0] : new AggregateError(errors);
}
