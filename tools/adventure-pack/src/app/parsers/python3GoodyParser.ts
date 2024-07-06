import { z } from "zod";

import { goodyBaseParser } from "./goodyBaseParser";

export const python3GoodyParser = goodyBaseParser.extend({
  language: z.literal("python3"),
});

export type Python3Goody = z.infer<typeof python3GoodyParser>;
