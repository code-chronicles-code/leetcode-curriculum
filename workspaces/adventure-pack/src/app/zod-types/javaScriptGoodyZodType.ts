import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

import { goodyBaseZodType } from "./goodyBaseZodType";

export const javaScriptGoodyZodType = goodyBaseZodType
  .extend({
    code: nonBlankStringZodType,
    language: z.literal("javascript"),
  })
  .strict();

export type JavaScriptGoody = ReadonlyDeep<
  z.infer<typeof javaScriptGoodyZodType>
>;
