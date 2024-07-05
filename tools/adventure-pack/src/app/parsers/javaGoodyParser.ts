import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const javaGoodyParser = goodyBaseParser.extend({
  // TODO: remove -- globalModuleDeclarations are a TypeScript concept
  globalModuleDeclarations: z.array(nonBlankStringParser),
  language: z.literal("java"),
});

export type JavaGoody = z.infer<typeof javaGoodyParser>;
