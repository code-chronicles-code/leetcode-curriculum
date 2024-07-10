import { z } from "zod";

import { nonBlankStringParser } from "./nonBlankStringParser";

export const goodyBaseParser = z.object({
  importedBy: z.array(nonBlankStringParser),
  imports: z.array(nonBlankStringParser),
  name: nonBlankStringParser,
});
