import type { ReadonlyDeep } from "type-fest";
import { z } from "zod";

import { javaGoodyZodType } from "./zod-types/javaGoodyZodType";
import { javaScriptGoodyZodType } from "./zod-types/javaScriptGoodyZodType";
import { kotlinGoodyZodType } from "./zod-types/kotlinGoodyZodType";
import { python3GoodyZodType } from "./zod-types/python3GoodyZodType";
import { typeScriptGoodyZodType } from "./zod-types/typeScriptGoodyZodType";

const goodiesByLanguage = z.object({
  java: z.record(z.string(), javaGoodyZodType),
  javascript: z.record(z.string(), javaScriptGoodyZodType),
  kotlin: z.record(z.string(), kotlinGoodyZodType),
  python3: z.record(z.string(), python3GoodyZodType),
  typescript: z.record(z.string(), typeScriptGoodyZodType),
});

export type GoodiesByLanguage = ReadonlyDeep<z.infer<typeof goodiesByLanguage>>;

export async function fetchGoodies(): Promise<GoodiesByLanguage> {
  const response = await fetch("goodies.json");

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  return goodiesByLanguage.parse(await response.json());
}
