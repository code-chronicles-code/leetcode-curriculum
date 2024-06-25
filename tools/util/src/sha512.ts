import crypto from "node:crypto";

export function sha512(text: string): string {
  return crypto
    .createHash("sha512")
    .update(text, "utf8")
    .digest()
    .toString("hex");
}
