import { z } from "zod";

export const questionDifficultyParser = z.enum(["Easy", "Medium", "Hard"]);

export type QuestionDifficulty = z.infer<typeof questionDifficultyParser>;
