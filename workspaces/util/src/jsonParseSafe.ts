import type { JsonValue } from "type-fest";

export function jsonParseSafe(
  ...args: Parameters<typeof JSON.parse>
): { data: JsonValue } | undefined {
  try {
    return { data: JSON.parse(...args) };
  } catch {
    return undefined;
  }
}
