export function spliceString(
  s: string,
  start: number,
  deleteCount: number = Infinity,
  ...items: unknown[]
): string {
  const chars: unknown[] = [...s];
  chars.splice(start, deleteCount, ...items);
  return chars.join("");
}
