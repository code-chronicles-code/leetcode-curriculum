import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const kotlinGoodyParser = goodyBaseParser
  .extend({
    code: nonBlankStringParser,
    importsCode: z.string(),
    language: z.literal("kotlin"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
  })
  .strict();

export type KotlinGoody = ReadonlyDeep<z.infer<typeof kotlinGoodyParser>>;
