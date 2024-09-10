import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType";

// TODO: find a way to enforce the strict-ness across all these files
export const typeScriptGoodyZodType = goodyBaseZodType
  .extend({
    code: nonBlankStringZodType,
    moduleDeclarations: z.record(
      z.string(),
      z.strictObject({
        interfaces: z
          .record(z.string(), z.array(nonBlankStringZodType))
          .optional(),
        variables: z.array(nonBlankStringZodType).optional(),
      }),
    ),
    language: z.literal("typescript"),
  })
  .strict();

export type TypeScriptGoody = ReadonlyDeep<
  z.infer<typeof typeScriptGoodyZodType>
>;
