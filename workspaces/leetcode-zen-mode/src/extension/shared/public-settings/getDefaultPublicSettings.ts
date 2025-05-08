import type { PublicSettings } from "./publicSettingsZodType.ts";

export function getDefaultPublicSettings(): PublicSettings {
  return {
    preferredDifficulty: "Easy",
  };
}
