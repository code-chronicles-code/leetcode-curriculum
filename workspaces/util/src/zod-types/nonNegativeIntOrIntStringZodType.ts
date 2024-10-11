import { z } from "zod";

export const nonNegativeIntOrIntStringZodType = z.union([
  z.number().int().nonnegative(),
  z
    .string()
    .trim()
    .regex(/^(?:[1-9][0-9]*|0)$/),
]);
