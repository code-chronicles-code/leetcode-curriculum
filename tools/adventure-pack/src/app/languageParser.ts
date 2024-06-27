import { z } from "zod";

export const languageParser = z.enum([
  "java",
  "javascript",
  "python3",
  "typescript",
]);

export type Language = z.infer<typeof languageParser>;
