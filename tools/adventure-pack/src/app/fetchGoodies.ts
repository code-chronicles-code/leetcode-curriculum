import { z } from "zod";

import { goodyParser, type Goody } from "./goodyParser";
import { languageParser, type Language } from "./languageParser";

const parser = z.record(languageParser, z.record(goodyParser));

export async function fetchGoodies(): Promise<
  Record<Language, Record<string, Goody>>
> {
  const response = await fetch("goodies.json");

  if (!response.ok) {
    throw new Error(`Got status ${response.status} from server!`);
  }

  const res = parser.parse(await response.json());
  for (const language of Object.keys(languageParser.enum) as Language[]) {
    res[language] ??= {};
  }

  return res as Required<z.infer<typeof parser>>;
}
