import { z } from "zod";

export const slugZodType = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:\-[a-z0-9]+)*$/);
