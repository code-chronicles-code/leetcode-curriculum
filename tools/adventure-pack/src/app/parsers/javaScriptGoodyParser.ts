import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";
import { nonBlankStringParser } from "./nonBlankStringParser";

export const javaScriptGoodyParser = goodyBaseParser.extend({
  code: nonBlankStringParser,
  language: z.literal("javascript"),
});

export type JavaScriptGoody = z.infer<typeof javaScriptGoodyParser>;
