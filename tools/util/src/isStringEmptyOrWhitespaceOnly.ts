export function isStringEmptyOrWhitespaceOnly(s: string): boolean {
  return !/\S/.test(s);
}
