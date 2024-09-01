function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return (Array.isArray(obj) ? obj : Object.keys(obj)).length === 0;
}
