import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";

import { SETTINGS_ATTRIBUTE, SETTINGS_STORAGE_KEY } from "../constants.ts";

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
