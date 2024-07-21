export function compareStringsCaseInsensitive(
  a: PropertyKey,
  b: PropertyKey,
): number {
  const aStr = String(a);
  const bStr = String(b);

  // Fall back to case-sensitive if the strings are case-insensitively equivalent.
  return (
    aStr.toLowerCase().localeCompare(bStr.toLowerCase()) ||
    aStr.localeCompare(bStr)
  );
}
