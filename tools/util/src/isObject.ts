import type { ReadonlyDeep } from "type-fest";

export function isObject(
  obj: unknown,
): obj is ReadonlyDeep<Record<PropertyKey, unknown>> {
  return obj != null && typeof obj === "object" && !Array.isArray(obj);
}
