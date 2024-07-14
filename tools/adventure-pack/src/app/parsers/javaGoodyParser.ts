import { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const javaGoodyParser = goodyBaseParser
  .extend({
    codeByClass: z.record(
      nonBlankStringParser,
      z
        .object({
          code: z.string(),
          declaration: nonBlankStringParser,
        })
        .strict(),
    ),
    coreImports: z.array(nonBlankStringParser),
    importsCode: z.string(),
    language: z.literal("java"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
  })
  .strict();

export type JavaGoody = ReadonlyDeep<z.infer<typeof javaGoodyParser>>;
