import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const javaScriptGoodyParser = goodyBaseParser.extend({
  // TODO: remove -- globalModuleDeclarations are a TypeScript concept
  globalModuleDeclarations: z.array(nonBlankStringParser),
  language: z.literal("javascript"),
});

export type JavaScriptGoody = z.infer<typeof javaScriptGoodyParser>;
