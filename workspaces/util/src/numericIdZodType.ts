import { z } from "zod";

export const numericIdZodType = z.union([
  z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/),
  z.number().int().positive(),
]);
