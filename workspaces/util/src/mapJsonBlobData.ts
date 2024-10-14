import type { JsonValue } from "type-fest";

import { constructJsonBlob } from "@code-chronicles/util/constructJsonBlob";

export async function mapJsonBlobData(
  blob: Blob,
  mapFn: (data: JsonValue) => JsonValue,
): Promise<Blob> {
  const data: JsonValue = JSON.parse(await blob.text());
  return constructJsonBlob(mapFn(data));
}
