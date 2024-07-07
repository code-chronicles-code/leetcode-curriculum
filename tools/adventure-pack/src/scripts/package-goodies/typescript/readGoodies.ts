import invariant from "invariant";
import fsPromises from "node:fs/promises";

import { stripPrefixOrThrow } from "@code-chronicles/util";

import type { JavaScriptGoody } from "../../../app/parsers/javaScriptGoodyParser";
import type { TypeScriptGoody } from "../../../app/parsers/typeScriptGoodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";
import { transpile } from "./transpile";

export async function readGoodies(): Promise<{
  javascript: Record<string, JavaScriptGoody>;
  typescript: Record<string, TypeScriptGoody>;
}> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, TypeScriptGoody> = {};
  const registerGoody = (goody: TypeScriptGoody): void => {
    invariant(
      goodiesByName[goody.name] == null,
      `Goody ${goody.name} already exists!`,
    );
    goodiesByName[goody.name] = goody;
  };

  for (const entry of fileEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const goody = await readBasicGoody(entry.name);
    invariant(goody.name === entry.name, "Mismatched goody name!");
    registerGoody(goody);
  }

  for (const goody of Object.values(goodiesByName)) {
    goody.imports = goody.imports.map((im) => {
      const res = stripPrefixOrThrow(im, "../");
      invariant(
        goodiesByName[res] != null,
        `Unknown import ${JSON.stringify(im)} in ${goody.name}`,
      );
      return res;
    });
  }

  for (const goody of Object.values(goodiesByName)) {
    for (const im of goody.imports) {
      goodiesByName[im].importedBy.push(goody.name);
    }
  }

  for (const goody of Object.values(goodiesByName)) {
    goody.importedBy.sort();
    goody.imports.sort();
  }

  const res: {
    javascript: Record<string, JavaScriptGoody>;
    typescript: Record<string, TypeScriptGoody>;
  } = {
    javascript: {},
    typescript: {},
  };

  for (const name of Object.keys(goodiesByName).sort()) {
    const goody = goodiesByName[name];

    res.typescript[name] = goody;

    const { globalModuleDeclarations: _, ...rest } = goody;
    res.javascript[name] = {
      ...rest,

      // eslint-disable-next-line no-await-in-loop
      code: await transpile(goody.code),
      language: "javascript",
    };
  }

  return res;
}
