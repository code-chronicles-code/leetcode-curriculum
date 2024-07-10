import invariant from "invariant";
import fsPromises from "node:fs/promises";

import {
  mapObjectValuesAsync,
  setIfNotHasOwnOrThrow,
} from "@code-chronicles/util";

import type { JavaScriptGoody } from "../../../app/parsers/javaScriptGoodyParser";
import type { TypeScriptGoody } from "../../../app/parsers/typeScriptGoodyParser";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports";
import {
  type TypeScriptGoodyBase,
  readBaseGoody,
  GOODIES_DIRECTORY,
} from "./readBaseGoody";
import { transpile } from "./transpile";

export async function readGoodies(): Promise<{
  javascript: Record<string, JavaScriptGoody>;
  typescript: Record<string, TypeScriptGoody>;
}> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const baseGoodiesByName: Record<string, TypeScriptGoodyBase> = {};
  for (const entry of fileEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const baseGoody = await readBaseGoody(entry.name);
    invariant(baseGoody.name === entry.name, "Mismatched goody name!");
    setIfNotHasOwnOrThrow(baseGoodiesByName, baseGoody.name, baseGoody);
  }

  const goodiesByName = fillOutImportedByAndSortImports(baseGoodiesByName);

  return {
    javascript: await mapObjectValuesAsync(
      goodiesByName,
      async (goody: TypeScriptGoody): Promise<JavaScriptGoody> => {
        const { moduleDeclarations: _, ...rest } = goody;
        return {
          ...rest,

          code: await transpile(goody.code),
          language: "javascript",
        };
      },
    ),

    typescript: goodiesByName,
  };
}
