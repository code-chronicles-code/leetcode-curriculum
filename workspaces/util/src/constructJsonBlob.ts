import type { JsonValue } from "type-fest";

import { jsonMimeType } from "@code-chronicles/util/jsonMimeType";

export function constructJsonBlob(data: JsonValue): Blob {
  return new Blob([JSON.stringify(data)], { type: jsonMimeType });
}
