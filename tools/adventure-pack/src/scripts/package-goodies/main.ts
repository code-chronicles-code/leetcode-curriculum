import invariant from "invariant";
import fsPromises from "node:fs/promises";
import path from "node:path";

import { stripPrefixOrThrow } from "@code-chronicles/util";

import type { Goody } from "../../app/goodyParser";
import { readBasicGoody, GOODIES_DIRECTORY } from "./readBasicGoody";
import { transpileTypeScript } from "./transpileTypeScript";

async function main(): Promise<void> {
  const fileEntries = await fsPromises.readdir(GOODIES_DIRECTORY, {
    withFileTypes: true,
  });

  const goodiesByName: Record<string, Goody> = {};
  const registerGoody = (goody: Goody): void => {
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

  if (Object.keys(goodiesByName).length === 0) {
    return;
  }

  const goodiesOutput: Record<string, Record<string, Goody>> = {
    javascript: {},
    typescript: {},
  };

  for (const name of Object.keys(goodiesByName).sort()) {
    const goody = goodiesByName[name];

    goodiesOutput.typescript[name] = goody;

    goodiesOutput.javascript[name] = {
      ...goody,

      // eslint-disable-next-line no-await-in-loop
      code: await transpileTypeScript(goody.code),
      globalModuleDeclarations: [],
    };
  }

  await fsPromises.mkdir("dist", { recursive: true });
  await fsPromises.writeFile(
    path.join("dist", "goodies.json"),
    JSON.stringify(goodiesOutput) + "\n",
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
