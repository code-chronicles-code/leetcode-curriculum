function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  for (const _property in obj) {
    return false;
  }

  return true;
}
