import { z } from "zod";

import { getChrome } from "@code-chronicles/util/browser-extensions/chrome/getChrome";

import { useChromeStorage } from "./useChromeStorage.ts";
import { SETTINGS_STORAGE_KEY } from "./constants.ts";

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

const difficultyZodType = z.enum(DIFFICULTIES);

export type Difficulty = z.infer<typeof difficultyZodType>;

async function setPreferredDifficulty(
  newPreferredDifficulty: Difficulty,
): Promise<void> {
  await getChrome()?.storage.sync.set({
    [SETTINGS_STORAGE_KEY]: newPreferredDifficulty,
  });
}

export function usePreferredDifficulty(): [
  Difficulty,
  typeof setPreferredDifficulty,
] {
  const storage = useChromeStorage();

  const parseResult = difficultyZodType.safeParse(
    storage[SETTINGS_STORAGE_KEY],
  );
  const preferredDifficulty: Difficulty = parseResult.success
    ? parseResult.data
    : DIFFICULTIES[0];

  return [preferredDifficulty, setPreferredDifficulty];
}
