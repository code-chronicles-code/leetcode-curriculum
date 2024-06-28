import invariant from "invariant";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import { useEffect, useState } from "react";

// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { promiseIdleCallback } from "@code-chronicles/util/src/promiseIdleCallback";

import { centerTextInComment } from "./centerTextInComment";
import type { Goody } from "./goodyParser";

class InefficientPriorityQueue<T> {
  private readonly items: T[] = [];

  constructor(private readonly compareFn: (a: T, b: T) => number) {}

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    this.items.sort(this.compareFn);
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

function topo({
  goodies,
  selectedGoodies,
}: {
  goodies: Record<string, Goody>;
  selectedGoodies: ReadonlySet<string>;
}): string[] {
  const pq = new InefficientPriorityQueue<string>((a, b) => a.localeCompare(b));

  const stack = Array.from(selectedGoodies);
  const recursivelySelectedGoodies = new Set(stack);
  while (stack.length > 0) {
    for (const im of goodies[stack.pop()!].imports) {
      if (!recursivelySelectedGoodies.has(im)) {
        recursivelySelectedGoodies.add(im);
        stack.push(im);
      }
    }
  }

  const unsatisfiedImports = new Map<string, Set<string>>();
  const importedBy = new Map<string, ReadonlySet<string>>();
  for (const name of recursivelySelectedGoodies) {
    const goody = goodies[name];

    importedBy.set(
      name,
      new Set(
        goody.importedBy.filter((importer) =>
          recursivelySelectedGoodies.has(importer),
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

async function mergeCode({
  commitHash,
  goodies,
  selectedGoodies,
}: {
  commitHash: string;
  goodies: Record<string, Goody>;
  selectedGoodies: ReadonlySet<string>;
}): Promise<string> {
  if (selectedGoodies.size === 0) {
    return "// Equip some goodies to generate your pack!";
  }

  const mergedCode = await promiseIdleCallback(() => {
    const orderedGoodies = topo({ selectedGoodies, goodies }).map(
      (name) => goodies[name],
    );

    const globalModuleDeclarations = orderedGoodies.flatMap(
      (goody) => goody.globalModuleDeclarations,
    );

    return [
      globalModuleDeclarations.length > 0
        ? `declare global {\n${globalModuleDeclarations.join("\n\n")}\n}\n`
        : "",

      ...orderedGoodies.map((goody) => goody.code),
    ]
      .filter(Boolean)
      .join("\n\n");
  });

  return (
    await prettierFormat(
      centerTextInComment("BEGIN ADVENTURE PACK CODE") +
        "\n" +
        `// Adventure Pack commit ${commitHash}\n` +
        `// Running at: ${window.location.href}\n\n` +
        mergedCode +
        "\n\n" +
        centerTextInComment("END ADVENTURE PACK CODE"),
      {
        parser: "typescript",
        plugins: [prettierPluginESTree, prettierPluginTypeScript],
      },
    )
  ).trim();
}

export function useMergedCode({
  commitHash,
  goodies,
  selectedGoodies,
}: {
  commitHash: string;
  goodies: Record<string, Goody> | null;
  selectedGoodies: ReadonlySet<string>;
}): string {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (goodies == null) {
      return;
    }

    let isActive = true;

    mergeCode({ commitHash, goodies, selectedGoodies }).then((mergedCode) => {
      isActive && setCode(mergedCode);
    });

    return () => {
      isActive = false;
    };
  }, [goodies, selectedGoodies]);

  return code;
}
