import type { JsonValue } from "type-fest";

// TODO: could have more interesting typing when there's a reviver

export function jsonParseSafe(text: string): { data: JsonValue } | undefined;

export function jsonParseSafe(
  ...args: Parameters<typeof JSON.parse>
): { data: unknown } | undefined;

export function jsonParseSafe(
  ...args: Parameters<typeof JSON.parse>
): { data: JsonValue } | undefined {
  try {
    return { data: JSON.parse(...args) };
  } catch {
    return undefined;
  }
}
