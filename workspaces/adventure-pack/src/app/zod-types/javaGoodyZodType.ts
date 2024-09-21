import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType.ts";

export const javaGoodyZodType = goodyBaseZodType
  .extend({
    codeByClass: z.record(
      nonBlankStringZodType,
      z
        .object({
          code: z.string(),
          declaration: nonBlankStringZodType,
        })
        .strict(),
    ),
    coreImports: z.array(nonBlankStringZodType),
    importsCode: z.string(),
    language: z.literal("java"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
  })
  .strict();

export type JavaGoody = ReadonlyDeep<z.infer<typeof javaGoodyZodType>>;
