import { PUBLIC_SETTINGS_ATTRIBUTE } from "./constants.ts";
import { getDefaultPublicSettings } from "./getDefaultPublicSettings.ts";
import {
  publicSettingsZodType,
  type PublicSettings,
} from "./publicSettingsZodType.ts";

export function readPublicSettingsFromDocumentAttribute(
  parseFn: typeof JSON.parse = JSON.parse,
): PublicSettings {
  try {
    const attribute = document.documentElement.getAttribute(
      PUBLIC_SETTINGS_ATTRIBUTE,
    );
    if (attribute != null) {
      return publicSettingsZodType.parse(parseFn(attribute));
    }
  } catch (err) {
    console.error(err);
  }

  return getDefaultPublicSettings();
}
