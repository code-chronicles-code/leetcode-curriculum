import { z } from "zod";

export const nonBlankStringParser = z.string().regex(/\S/);
