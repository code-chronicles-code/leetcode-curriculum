import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const kotlinGoodyParser = goodyBaseParser
  .extend({
    code: nonBlankStringParser,
    language: z.literal("java"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
    importsCode: z.string(),
  })
  .strict();

export type KotlinGoody = z.infer<typeof kotlinGoodyParser>;
