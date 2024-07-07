import {
  compareStringsCaseInsensitive,
  sortObjectKeysRecursive,
} from "@code-chronicles/util";

import type { GoodiesByLanguage } from "../../app/fetchGoodies";
import { readGoodies as readJavaGoodies } from "./java/readGoodies";
import { readGoodies as readKotlinGoodies } from "./kotlin/readGoodies";
import { readGoodies as readPythonGoodies } from "./python3/readGoodies";
import { readGoodies as readTypeScriptAndJavaScriptGoodies } from "./typescript/readGoodies";

function sortLanguagesGoodiesAndGoodyFields(
  goodies: GoodiesByLanguage,
): GoodiesByLanguage {
  return sortObjectKeysRecursive(goodies, compareStringsCaseInsensitive, 3);
}

export async function readAllGoodies(): Promise<GoodiesByLanguage> {
  return sortLanguagesGoodiesAndGoodyFields({
    java: await readJavaGoodies(),
    kotlin: await readKotlinGoodies(),
    python3: await readPythonGoodies(),
    ...(await readTypeScriptAndJavaScriptGoodies()),
  });
}
