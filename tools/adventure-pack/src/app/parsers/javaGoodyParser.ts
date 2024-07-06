import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";

export const javaGoodyParser = goodyBaseParser.extend({
  language: z.literal("java"),
  packageName: z
    .string()
    .regex(/^[a-z0-9_]+$/)
    .regex(/^[^_]/)
    .regex(/[^_]$/),
  importsCode: z.string(),
});

export type JavaGoody = z.infer<typeof javaGoodyParser>;
