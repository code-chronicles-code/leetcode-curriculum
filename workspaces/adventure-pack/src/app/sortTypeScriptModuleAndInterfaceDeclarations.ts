import type { ReadonlyDeep } from "type-fest";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { sortObjectKeysRecursive } from "@code-chronicles/util/sortObjectKeysRecursive";

export function sortTypeScriptModuleAndInterfaceDeclarations(
  moduleDeclarations: ReadonlyDeep<Record<string, Record<string, string[]>>>,
): Record<string, Record<string, string[]>> {
  return sortObjectKeysRecursive(
    mapObjectValues(moduleDeclarations, (interfaceDeclarations) =>
      mapObjectValues(interfaceDeclarations, (codeSections) =>
        [...codeSections].sort(compareStringsCaseInsensitive),
      ),
    ),
    compareStringsCaseInsensitive,
    2,
  );
}
