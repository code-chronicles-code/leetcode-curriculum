import invariant from "invariant";
import { ReadonlyDeep } from "type-fest";

import {
  compareStringsCaseInsensitive,
  mapObjectValues,
} from "@code-chronicles/util";

export function fillOutImportedByAndSortImports<
  T extends ReadonlyDeep<{ imports: string[]; name: string }>,
>(
  baseGoodiesByName: Record<string, T>,
): Record<string, T & { importedBy: string[] }> {
  const res = mapObjectValues(baseGoodiesByName, (baseGoody) => ({
    ...baseGoody,
    importedBy: [] as string[],
    imports: [...baseGoody.imports].sort(compareStringsCaseInsensitive),
  }));

  for (const goody of Object.values(res)) {
    for (const im of goody.imports) {
      invariant(
        res[im] != null,
        `Unknown import ${JSON.stringify(im)} in goody ${JSON.stringify(goody.name)}.`,
      );
      res[im].importedBy.push(goody.name);
    }
  }

  for (const goody of Object.values(res)) {
    goody.importedBy.sort(compareStringsCaseInsensitive);
  }

  return res;
}
