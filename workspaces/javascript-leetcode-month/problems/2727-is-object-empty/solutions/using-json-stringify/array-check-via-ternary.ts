function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj) ? obj.length === 0 : JSON.stringify(obj) === "{}";
}
