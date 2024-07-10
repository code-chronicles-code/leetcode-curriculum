import type { ReadonlyDeep } from "type-fest";

// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { compareStringsCaseInsensitive } from "@code-chronicles/util/src/compareStringsCaseInsensitive";
// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { mapObjectValues } from "@code-chronicles/util/src/mapObjectValues";
// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { sortObjectKeysRecursive } from "@code-chronicles/util/src/sortObjectKeysRecursive";

export function sortTypeScriptModuleAndInterfaceDeclarations(
  moduleDeclarations: ReadonlyDeep<Record<string, Record<string, string[]>>>,
): Record<string, Record<string, string[]>> {
  return sortObjectKeysRecursive(
    mapObjectValues(moduleDeclarations, (interfaceDeclarations) =>
      mapObjectValues(interfaceDeclarations, (codeGroups) =>
        [...codeGroups].sort(compareStringsCaseInsensitive),
      ),
    ),
    compareStringsCaseInsensitive,
    2,
  );
}
