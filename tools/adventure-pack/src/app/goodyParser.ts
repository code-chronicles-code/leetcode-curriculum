import { z } from "zod";

const nonBlankStringParser = z.string().regex(/\S/);

export const goodyParser = z.object({
  code: nonBlankStringParser,
  globalModuleDeclarations: z.array(nonBlankStringParser),
  imports: z.array(nonBlankStringParser),
  importedBy: z.array(nonBlankStringParser),
  name: nonBlankStringParser,
});

export type Goody = z.infer<typeof goodyParser>;
