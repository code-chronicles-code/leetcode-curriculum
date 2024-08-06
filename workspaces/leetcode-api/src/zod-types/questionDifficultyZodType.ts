import { z } from "zod";

export const questionDifficultyZodType = z.enum(["Easy", "Medium", "Hard"]);

export type QuestionDifficulty = z.infer<typeof questionDifficultyZodType>;
