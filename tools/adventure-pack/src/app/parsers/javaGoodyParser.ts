import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const javaGoodyParser = goodyBaseParser
  .extend({
    codeByClass: z.record(
      nonBlankStringParser,
      z
        .object({
          modifiers: z.array(nonBlankStringParser),
          code: z.string(),
        })
        .strict(),
    ),
    language: z.literal("java"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
    importsCode: z.string(),
  })
  .strict();

export type JavaGoody = z.infer<typeof javaGoodyParser>;
