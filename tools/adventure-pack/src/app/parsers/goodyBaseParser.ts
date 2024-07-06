import { z } from "zod";

import { nonBlankStringParser } from "./nonBlankStringParser";

export const goodyBaseParser = z.object({
  code: nonBlankStringParser,
  imports: z.array(nonBlankStringParser),
  importedBy: z.array(nonBlankStringParser),
  name: nonBlankStringParser,
});

export type GoodyBase = z.infer<typeof goodyBaseParser>;
