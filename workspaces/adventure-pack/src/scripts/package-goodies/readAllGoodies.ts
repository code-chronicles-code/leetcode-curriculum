import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { promiseAllObject } from "@code-chronicles/util/promiseAllObject";
import { sortObjectKeysRecursive } from "@code-chronicles/util/sortObjectKeysRecursive";

import type { GoodiesByLanguage } from "../../app/fetchGoodies.ts";
import { readGoodies as readJavaGoodies } from "./java/readGoodies.ts";
import { readGoodies as readKotlinGoodies } from "./kotlin/readGoodies.ts";
import { readGoodies as readPythonGoodies } from "./python3/readGoodies.ts";
import { readGoodies as readTypeScriptAndJavaScriptGoodies } from "./typescript/readGoodies.ts";

function sortLanguagesGoodiesAndGoodyFields(
  goodies: GoodiesByLanguage,
): GoodiesByLanguage {
  return sortObjectKeysRecursive(goodies, compareStringsCaseInsensitive, 3);
}

export async function readAllGoodies(): Promise<GoodiesByLanguage> {
  const [typeScriptAndJavaScriptGoodies, otherLanguageGoodies] =
    await Promise.all([
      readTypeScriptAndJavaScriptGoodies(),
      promiseAllObject({
        java: readJavaGoodies(),
        kotlin: readKotlinGoodies(),
        python3: readPythonGoodies(),
      }),
    ]);

  return sortLanguagesGoodiesAndGoodyFields({
    ...typeScriptAndJavaScriptGoodies,
    ...otherLanguageGoodies,
  });
}
