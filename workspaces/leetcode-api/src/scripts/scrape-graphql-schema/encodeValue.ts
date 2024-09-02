import { Buffer } from "node:buffer";

export function encodeValue(
  value: string | undefined,
  marker: string,
): string | undefined {
  return value == null
    ? undefined
    : `${marker}-${Buffer.from(value).toString("hex")}`;
}
