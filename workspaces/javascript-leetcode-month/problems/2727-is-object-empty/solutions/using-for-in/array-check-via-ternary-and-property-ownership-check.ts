function isEmptyObject(obj: Readonly<Record<PropertyKey, unknown>>): boolean {
  for (const property in obj) {
    if (Object.hasOwn(obj, property)) {
      return false;
    }
  }

  return true;
}

function isEmpty(
  obj: Readonly<Record<PropertyKey, unknown>> | readonly unknown[],
): boolean {
  return Array.isArray(obj) ? obj.length === 0 : isEmptyObject(obj);
}
