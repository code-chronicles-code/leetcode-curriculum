import { PUBLIC_SETTINGS_ATTRIBUTE } from "./constants.ts";
import type { PublicSettings } from "./publicSettingsZodType.ts";

export function writePublicSettingsToDocumentAttribute(
  settings: PublicSettings,
): void {
  document.documentElement.setAttribute(
    PUBLIC_SETTINGS_ATTRIBUTE,
    JSON.stringify(settings),
  );
}
