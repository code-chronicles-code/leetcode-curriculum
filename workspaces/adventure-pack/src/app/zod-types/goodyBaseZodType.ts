import { z } from "zod";

import { nonBlankStringZodType } from "@code-chronicles/util/zod-types/nonBlankStringZodType";

export const goodyBaseZodType = z.object({
  importedBy: z.array(nonBlankStringZodType),
  imports: z.array(nonBlankStringZodType),
  name: nonBlankStringZodType,
});
