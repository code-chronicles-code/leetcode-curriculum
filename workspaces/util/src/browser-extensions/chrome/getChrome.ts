import type { Chrome } from "chrome";

export function getChrome(): Chrome | undefined {
  return typeof chrome === "object"
    ? (chrome as unknown as Chrome | undefined)
    : undefined;
}
