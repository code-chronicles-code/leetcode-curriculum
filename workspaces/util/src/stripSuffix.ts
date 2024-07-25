import invariant from "invariant";

export function stripSuffix(s: string, suffix: string): string {
  invariant(suffix.length > 0, "Suffix must be non-empty!");
  return s.endsWith(suffix) ? s.slice(0, -suffix.length) : s;
}
