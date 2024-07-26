import { compareStrings } from "@code-chronicles/util/compareStrings";

export function compareStringsCaseInsensitive(a: string, b: string): number {
  // Fall back to case-sensitive if the strings are case-insensitively equivalent.
  return (
    compareStrings(a.toLowerCase(), b.toLowerCase()) || compareStrings(a, b)
  );
}
