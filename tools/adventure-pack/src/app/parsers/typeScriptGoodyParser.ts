import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const typeScriptGoodyParser = goodyBaseParser.extend({
  code: nonBlankStringParser,
  // TODO: generalize to simply declarations
  globalModuleDeclarations: z.array(nonBlankStringParser),
  language: z.literal("typescript"),
});

export type TypeScriptGoody = z.infer<typeof typeScriptGoodyParser>;
