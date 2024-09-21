import fsPromises from "node:fs/promises";

import invariant from "invariant";

import { mapObjectValuesAsync } from "@code-chronicles/util/mapObjectValuesAsync";
import { setIfNotHasOwnOrThrow } from "@code-chronicles/util/setIfNotHasOwnOrThrow";

import type { JavaScriptGoody } from "../../../app/zod-types/javaScriptGoodyZodType.ts";
import type { TypeScriptGoody } from "../../../app/zod-types/typeScriptGoodyZodType.ts";
import { fillOutImportedByAndSortImports } from "../fillOutImportedByAndSortImports.ts";
import {
  GOODIES_DIRECTORY,
  type TypeScriptGoodyBase,
  readBaseGoody,
} from "./readBaseGoody.ts";
import { transpile } from "./transpile.ts";

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
