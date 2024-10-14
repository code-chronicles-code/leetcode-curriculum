import type { JsonValue } from "type-fest";

export const JSON_MIME_TYPE = "application/json";

export function constructJsonBlob(data: JsonValue): Blob {
  return new Blob([JSON.stringify(data)], { type: JSON_MIME_TYPE });
}
