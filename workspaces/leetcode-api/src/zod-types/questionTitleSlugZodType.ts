import { z } from "zod";

export const questionTitleSlugZodType = z
  .string()
  .trim()
  .regex(/^[a-z0-9\-]+$/);
