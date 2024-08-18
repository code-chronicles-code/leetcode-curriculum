export function squashWhitespace(s: string): string {
  return s.trim().replace(/\s+/g, " ");
}
