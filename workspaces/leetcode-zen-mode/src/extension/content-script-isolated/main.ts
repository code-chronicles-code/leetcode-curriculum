import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";

import { PUBLIC_SETTINGS_STORAGE_KEY } from "../shared/public-settings/constants.ts";
import { publicSettingsZodType } from "../shared/public-settings/publicSettingsZodType.ts";
import { writePublicSettingsToDocumentAttribute } from "../shared/public-settings/writePublicSettingsToDocumentAttribute.ts";

/**
 * Entry point for the extension content script that will run in an isolated
 * world, per:
 * https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#isolated_world
 *
 * Because it's isolated, it should have access to APIs like `chrome.storage`,
 * and as such, its job is to relay the settings to the non-isolated content
 * script.
 */
async function main(): Promise<void> {
  const chrome = getChrome();
  if (!chrome) {
    console.error("Couldn't find `chrome` in the environment!");
    return;
  }

  const unsafePublicSettings: unknown = (
    await chrome.storage.sync.get(PUBLIC_SETTINGS_STORAGE_KEY)
  )[PUBLIC_SETTINGS_STORAGE_KEY];
  if (unsafePublicSettings == null) {
    return;
  }

  writePublicSettingsToDocumentAttribute(
    publicSettingsZodType.parse(unsafePublicSettings),
  );
}

main();
