import type { Chrome } from "chrome";

export function getChrome(): Chrome | undefined {
  return globalThis?.chrome as unknown as Chrome | undefined;
}
