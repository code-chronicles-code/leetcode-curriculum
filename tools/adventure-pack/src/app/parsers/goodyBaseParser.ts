import { z } from "zod";

import { nonBlankStringParser } from "./nonBlankStringParser";

export const goodyBaseParser = z.object({
  imports: z.array(nonBlankStringParser),
  importedBy: z.array(nonBlankStringParser),
  name: nonBlankStringParser,
});
