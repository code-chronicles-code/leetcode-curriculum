import { z } from "zod";

import { difficultyZodType } from "../../problemDifficulties.ts";

export const publicSettingsZodType = z.object({
  preferredDifficulty: difficultyZodType,
});

export type PublicSettings = z.infer<typeof publicSettingsZodType>;
