export function isNonArrayObject(
  value: unknown,
): value is Partial<Record<PropertyKey, unknown>> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}
