import { z } from "zod";

export const positiveIntOrIntStringZodType = z.union([
  z.number().int().positive(),
  z
    .string()
    .trim()
    .regex(/^[1-9][0-9]*$/),
]);
