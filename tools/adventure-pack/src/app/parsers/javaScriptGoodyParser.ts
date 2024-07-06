import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";

export const javaScriptGoodyParser = goodyBaseParser.extend({
  language: z.literal("javascript"),
});

export type JavaScriptGoody = z.infer<typeof javaScriptGoodyParser>;
