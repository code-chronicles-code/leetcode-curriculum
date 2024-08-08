export function isSystemError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && Object.hasOwn(error, "code");
}
