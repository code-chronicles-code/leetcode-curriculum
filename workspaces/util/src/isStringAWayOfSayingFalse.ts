const FALSY_VALUES = new Set(["", "0", "false", "no", "off"]);

export function isStringAWayOfSayingFalse(s: string): boolean {
  return FALSY_VALUES.has(s.trim().toLowerCase());
}
