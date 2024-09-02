import { Buffer } from "node:buffer";

export function parseEncodedValues(text: string, marker: string): string {
  return text.replace(
    new RegExp('"' + marker + '-([^"]+)"', "g"),
    (_match, encodedValue) => Buffer.from(encodedValue, "hex").toString("utf8"),
  );
}
