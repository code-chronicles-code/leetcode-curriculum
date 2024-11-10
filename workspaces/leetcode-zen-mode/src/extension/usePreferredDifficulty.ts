import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";

import { useChromeStorage } from "./useChromeStorage.ts";
import { PUBLIC_SETTINGS_STORAGE_KEY } from "./shared/public-settings/constants.ts";
import {
  DIFFICULTIES,
  difficultyZodType,
  type Difficulty,
} from "./problemDifficulties.ts";

async function setPreferredDifficulty(
  newPreferredDifficulty: Difficulty,
): Promise<void> {
  await getChrome()?.storage.sync.set({
    [PUBLIC_SETTINGS_STORAGE_KEY]: newPreferredDifficulty,
  });
}

export function usePreferredDifficulty(): [
  Difficulty,
  typeof setPreferredDifficulty,
] {
  const storage = useChromeStorage();

  const parseResult = difficultyZodType.safeParse(
    storage[PUBLIC_SETTINGS_STORAGE_KEY],
  );
  const preferredDifficulty: Difficulty = parseResult.success
    ? parseResult.data
    : DIFFICULTIES[0];

  return [preferredDifficulty, setPreferredDifficulty];
}
