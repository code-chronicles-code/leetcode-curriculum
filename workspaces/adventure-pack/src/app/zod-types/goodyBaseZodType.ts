import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/nonBlankStringZodType";

export const goodyBaseZodType = z.object({
  importedBy: z.array(nonBlankStringZodType),
  imports: z.array(nonBlankStringZodType),
  name: nonBlankStringZodType,
});
