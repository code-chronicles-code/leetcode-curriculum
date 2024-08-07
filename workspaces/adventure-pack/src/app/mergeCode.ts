import invariant from "invariant";
import type { ReadonlyDeep } from "type-fest";

import { BinaryHeap } from "@code-chronicles/util/BinaryHeap";
import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";

import { centerTextInComment } from "./centerTextInComment";
import type { Goody } from "./Goody";
import type { Language } from "./Language";
import { mergeJavaCode } from "./mergeJavaCode";
import type { JavaGoody } from "./zod-types/javaGoodyZodType";
import { sortTypeScriptModuleAndInterfaceDeclarations } from "./sortTypeScriptModuleAndInterfaceDeclarations";
import { stringifyTypeScriptModuleDeclarations } from "./stringifyTypeScriptModuleDeclarations";

function topo({
  equippedGoodies,
  goodies,
}: {
  equippedGoodies: ReadonlySet<string>;
  goodies: ReadonlyDeep<Record<string, Goody>>;
}): string[] {
  const pq = new BinaryHeap<string>(compareStringsCaseInsensitive);

  const stack = Array.from(equippedGoodies);
  const recursivelyequippedGoodies = new Set(stack);
  while (stack.length > 0) {
    for (const im of goodies[stack.pop()!].imports) {
      if (!recursivelyequippedGoodies.has(im)) {
        recursivelyequippedGoodies.add(im);
        stack.push(im);
      }
    }
  }

  const unsatisfiedImports = new Map<string, Set<string>>();
  const importedBy = new Map<string, ReadonlySet<string>>();
  for (const name of recursivelyequippedGoodies) {
    const goody = goodies[name];

    importedBy.set(
      name,
      new Set(
        goody.importedBy.filter((importer) =>
          recursivelyequippedGoodies.has(importer),
        ),
      ),
    );

    if (goody.imports.length === 0) {
      pq.push(name);
    } else {
      unsatisfiedImports.set(name, new Set(goody.imports));
    }
  }

  const res: string[] = [];
  while (!pq.isEmpty()) {
    const name = pq.pop()!;
    res.push(name);

    for (const importer of importedBy.get(name) ?? []) {
      const importerUnsatisfiedImports = unsatisfiedImports.get(importer)!;
      importerUnsatisfiedImports.delete(name);
      if (importerUnsatisfiedImports.size === 0) {
        unsatisfiedImports.delete(importer);
        pq.push(importer);
      }
    }
  }

  invariant(
    unsatisfiedImports.size === 0,
    "Failed to satisfy all the imports.",
  );
  return res;
}

export type Data = {
  commitHash: string;
  equippedGoodies: ReadonlySet<string>;
  goodies: ReadonlyDeep<Record<string, Goody>>;
  language: Language;
};

export function mergeCode({
  commitHash,
  equippedGoodies,
  goodies,
  language,
}: Data): string {
  if (equippedGoodies.size === 0) {
    return language === "python3"
      ? "# Equip some goodies to generate your pack!"
      : "// Equip some goodies to generate your pack!";
  }

  const mergedCode = (() => {
    const orderedGoodies = topo({ equippedGoodies, goodies }).map(
      (name) => goodies[name],
    );

    if (language === "java") {
      return mergeJavaCode(
        orderedGoodies.map((goody): ReadonlyDeep<JavaGoody> => {
          invariant(
            goody.language === "java",
            "Goodies must match the language!",
          );
          return goody;
        }),
      );
    }

    const moduleDeclarations = (() => {
      if (language !== "typescript") {
        return "";
      }

      const mergedDeclarations: Record<string, Record<string, string[]>> = {};
      for (const goody of orderedGoodies) {
        invariant(
          goody.language === "typescript",
          "Goody language must match language!",
        );

        for (const [moduleName, interfaceDeclarations] of Object.entries(
          goody.moduleDeclarations,
        )) {
          for (const [interfaceName, codeSections] of Object.entries(
            interfaceDeclarations,
          )) {
            ((mergedDeclarations[moduleName] ??= {})[interfaceName] ??=
              []).push(...codeSections);
          }
        }
      }

      return stringifyTypeScriptModuleDeclarations(
        sortTypeScriptModuleAndInterfaceDeclarations(mergedDeclarations),
      );
    })();

    return [
      moduleDeclarations,

      ...orderedGoodies.map((goody) => {
        invariant(
          goody.language !== "java",
          "Java has already been handled separately.",
        );
        return goody.code.trim();
      }),
    ]
      .filter(Boolean)
      .join("\n\n");
  })();

  if (language === "java") {
    return (
      centerTextInComment({
        commentType: "//",
        text: "BEGIN ADVENTURE PACK CODE",
      }) +
      "\n" +
      `// Adventure Pack commit ${commitHash}\n` +
      `// Running at: ${window.location.href}\n\n` +
      mergedCode +
      "\n\n" +
      centerTextInComment({
        commentType: "//",
        text: "END ADVENTURE PACK CODE",
      })
    );
  }

  if (language === "kotlin") {
    return (
      centerTextInComment({
        commentType: "//",
        text: "BEGIN ADVENTURE PACK CODE",
      }) +
      "\n" +
      `// Adventure Pack commit ${commitHash}\n` +
      `// Running at: ${window.location.href}\n\n` +
      mergedCode +
      "\n\n" +
      centerTextInComment({
        text: "END ADVENTURE PACK CODE",
        commentType: "//",
      })
    );
  }

  if (language === "python3") {
    return (
      centerTextInComment({
        commentType: "#",
        text: "BEGIN ADVENTURE PACK CODE",
      }) +
      "\n" +
      `# Adventure Pack commit ${commitHash}\n` +
      `# Running at: ${window.location.href}\n\n` +
      mergedCode +
      "\n\n" +
      centerTextInComment({ commentType: "#", text: "END ADVENTURE PACK CODE" })
    );
  }

  return (
    centerTextInComment({
      commentType: "//",
      text: "BEGIN ADVENTURE PACK CODE",
    }) +
    "\n" +
    `// Adventure Pack commit ${commitHash}\n` +
    `// Running at: ${window.location.href}\n\n` +
    mergedCode.replaceAll(/^export\s+/gm, "") +
    "\n\n" +
    centerTextInComment({
      commentType: "//",
      text: "END ADVENTURE PACK CODE",
    })
  ).trim();
}
