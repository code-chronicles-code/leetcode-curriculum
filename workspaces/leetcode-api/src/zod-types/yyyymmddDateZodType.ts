import { z } from "zod";

export const yyyymmddDateZodType = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/);
