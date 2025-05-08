import nullthrows from "nullthrows";
import { z } from "zod";

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export const difficultyZodType = z
  .string()
  .transform((s) =>
    nullthrows(DIFFICULTIES.find((d) => d.toLowerCase() === s.toLowerCase())),
  );

export type Difficulty = z.infer<typeof difficultyZodType>;
