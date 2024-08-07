import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType";

export const typeScriptGoodyZodType = goodyBaseZodType
  .extend({
    code: nonBlankStringZodType,
    moduleDeclarations: z.record(
      z.string(),
      z.record(z.string(), z.array(nonBlankStringZodType)),
    ),
    language: z.literal("typescript"),
  })
  .strict();

export type TypeScriptGoody = ReadonlyDeep<
  z.infer<typeof typeScriptGoodyZodType>
>;
