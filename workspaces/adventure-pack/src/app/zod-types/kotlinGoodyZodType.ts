import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType";

export const kotlinGoodyZodType = goodyBaseZodType
  .extend({
    code: nonBlankStringZodType,
    importsCode: z.string(),
    language: z.literal("kotlin"),
    packageName: z
      .string()
      .regex(/^[a-z0-9_]+$/)
      .regex(/^[^_]/)
      .regex(/[^_]$/),
  })
  .strict();

export type KotlinGoody = ReadonlyDeep<z.infer<typeof kotlinGoodyZodType>>;
