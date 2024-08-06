import { z } from "zod";

export const nonBlankStringZodType = z.string().regex(/\S/);
