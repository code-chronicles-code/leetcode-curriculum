import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";

import { SETTINGS_ATTRIBUTE, SETTINGS_STORAGE_KEY } from "../constants.ts";

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

  const settings = await chrome.storage.sync.get(SETTINGS_STORAGE_KEY);
  document.documentElement.setAttribute(
    SETTINGS_ATTRIBUTE,
    JSON.stringify(settings[SETTINGS_STORAGE_KEY]),
  );
}

main();
