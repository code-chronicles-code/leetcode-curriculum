import invariant from "invariant";

export function stripPrefix(s: string, prefix: string): string {
  invariant(prefix.length > 0, "Prefix must be non-empty");
  return s.startsWith(prefix) ? s.slice(prefix.length) : s;
}
