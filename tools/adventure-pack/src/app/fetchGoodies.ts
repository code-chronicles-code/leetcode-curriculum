import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { javaGoodyParser } from "./parsers/javaGoodyParser";
import { javaScriptGoodyParser } from "./parsers/javaScriptGoodyParser";
import { kotlinGoodyParser } from "./parsers/kotlinGoodyParser";
import { python3GoodyParser } from "./parsers/python3GoodyParser";
import { typeScriptGoodyParser } from "./parsers/typeScriptGoodyParser";

const parser = z.object({
  java: z.record(z.string(), javaGoodyParser),
  javascript: z.record(z.string(), javaScriptGoodyParser),
  kotlin: z.record(z.string(), kotlinGoodyParser),
  python3: z.record(z.string(), python3GoodyParser),
  typescript: z.record(z.string(), typeScriptGoodyParser),
});

export type GoodiesByLanguage = ReadonlyDeep<z.infer<typeof parser>>;

export async function fetchGoodies(): Promise<GoodiesByLanguage> {
  const response = await fetch("goodies.json");

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return parser.parse(await response.json());
}
