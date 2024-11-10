import { z } from "zod";

import { getChrome } from "./getChrome.ts";
import { useChromeStorage } from "./useChromeStorage.ts";

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

const difficultyZodType = z.enum(DIFFICULTIES);

export type Difficulty = z.infer<typeof difficultyZodType>;

const STORAGE_KEY = "preferredDifficulty";

async function setPreferredDifficulty(
  newPreferredDifficulty: Difficulty,
): Promise<void> {
  await getChrome()?.storage.sync.set({
    [STORAGE_KEY]: newPreferredDifficulty,
  });
}

export function usePreferredDifficulty(): [
  Difficulty,
  typeof setPreferredDifficulty,
] {
  const storage = useChromeStorage();

  const parseResult = difficultyZodType.safeParse(storage[STORAGE_KEY]);
  const preferredDifficulty: Difficulty = parseResult.success
    ? parseResult.data
    : DIFFICULTIES[0];

  return [preferredDifficulty, setPreferredDifficulty];
}
