import { z } from "zod";

export const questionTitleSlugParser = z
  .string()
  .trim()
  .regex(/^[a-z0-9\-]+$/);
