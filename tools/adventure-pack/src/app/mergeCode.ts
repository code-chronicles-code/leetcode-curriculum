import invariant from "invariant";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import type { ReadonlyDeep } from "type-fest";

// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { compareStringsCaseInsensitive } from "@code-chronicles/util/src/compareStringsCaseInsensitive";
// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { promiseIdleCallback } from "@code-chronicles/util/src/promiseIdleCallback";

import { BinaryHeap } from "./BinaryHeap";
import { centerTextInComment } from "./centerTextInComment";
import type { Goody } from "./Goody";
import type { Language } from "./Language";
import { mergeJavaCode } from "./mergeJavaCode";
import type { JavaGoody } from "./parsers/javaGoodyParser";

function topo({
  goodies,
  equippedGoodies,
}: {
  goodies: ReadonlyDeep<Record<string, Goody>>;
  equippedGoodies: ReadonlySet<string>;
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
  goodies: ReadonlyDeep<Record<string, Goody>>;
  language: Language;
  equippedGoodies: ReadonlySet<string>;
};

export async function mergeCode({
  commitHash,
  goodies,
  language,
  equippedGoodies,
}: Data): Promise<string> {
  if (equippedGoodies.size === 0) {
    return language === "python3"
      ? "# Equip some goodies to generate your pack!"
      : "// Equip some goodies to generate your pack!";
  }

  const mergedCode = await promiseIdleCallback(() => {
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

    const globalModuleDeclarations =
      language === "typescript"
        ? orderedGoodies.flatMap((goody) =>
            goody.language === "typescript"
              ? goody.globalModuleDeclarations
              : [],
          )
        : [];

    return [
      globalModuleDeclarations.length > 0
        ? `declare global {\n${globalModuleDeclarations.join("\n\n")}\n}\n`
        : "",

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
  });

  if (language === "java") {
    return (
      centerTextInComment({
        text: "BEGIN ADVENTURE PACK CODE",
        commentType: "//",
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

  if (language === "kotlin") {
    return (
      centerTextInComment({
        text: "BEGIN ADVENTURE PACK CODE",
        commentType: "//",
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
        text: "BEGIN ADVENTURE PACK CODE",
        commentType: "#",
      }) +
      "\n" +
      `# Adventure Pack commit ${commitHash}\n` +
      `# Running at: ${window.location.href}\n\n` +
      mergedCode +
      "\n\n" +
      centerTextInComment({ text: "END ADVENTURE PACK CODE", commentType: "#" })
    );
  }

  return (
    await prettierFormat(
      centerTextInComment({
        text: "BEGIN ADVENTURE PACK CODE",
        commentType: "//",
      }) +
        "\n" +
        `// Adventure Pack commit ${commitHash}\n` +
        `// Running at: ${window.location.href}\n\n` +
        mergedCode.replaceAll(/^export\s+/gm, "") +
        "\n\n" +
        centerTextInComment({
          text: "END ADVENTURE PACK CODE",
          commentType: "//",
        }),
      {
        parser: "typescript",
        plugins: [prettierPluginESTree, prettierPluginTypeScript],
      },
    )
  ).trim();
}
