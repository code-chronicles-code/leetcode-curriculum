import type { ReadonlyDeep } from "type-fest";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";
import { sortObjectKeysRecursive } from "@code-chronicles/util/sortObjectKeysRecursive";

import type { GoodyModuleDeclaration } from "../scripts/package-goodies/typescript/extractModuleDeclarations.ts";

export function sortTypeScriptModuleAndInterfaceDeclarations(
  moduleDeclarations: ReadonlyDeep<Record<string, GoodyModuleDeclaration>>,
): Record<string, GoodyModuleDeclaration> {
  return sortObjectKeysRecursive(
    mapObjectValues(
      moduleDeclarations,
      (
        moduleDeclaration: ReadonlyDeep<GoodyModuleDeclaration>,
      ): GoodyModuleDeclaration => ({
        ...(moduleDeclaration.interfaces && {
          interfaces: mapObjectValues(
            moduleDeclaration.interfaces,
            (codeSections) =>
              [...codeSections].sort(compareStringsCaseInsensitive),
          ),
        }),

        ...(moduleDeclaration.variables && {
          variables: [...moduleDeclaration.variables].sort(
            compareStringsCaseInsensitive,
          ),
        }),
      }),
    ),
    compareStringsCaseInsensitive,
    3,
  );
}
