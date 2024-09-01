function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.keys(obj).length === 0;
  }
}
