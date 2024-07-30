import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const typeScriptGoodyParser = goodyBaseParser.extend({
  code: nonBlankStringParser,
  moduleDeclarations: z.record(
    z.string(),
    z.record(z.string(), z.array(nonBlankStringParser)),
  ),
  language: z.literal("typescript"),
});

export type TypeScriptGoody = ReadonlyDeep<
  z.infer<typeof typeScriptGoodyParser>
>;
