import invariant from "invariant";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import { useEffect, useState } from "react";

import { centerTextInComment } from "./centerTextInComment";
import type { Goody } from "./fetchGoodies";

function promiseIdleCallback<T>(callback: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    requestIdleCallback(() => {
      try {
        resolve(callback());
      } catch (err) {
        reject(err);
      }
    });
  });
}

class InefficientPriorityQueue<T> {
  private items: T[] = [];
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compareFn = compareFn;
  }

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

  const unsatisfiedDependencies = new Map<string, Set<string>>();
  const unblocks = new Map<string, Set<string>>();
  for (const name of recursivelySelectedGoodies) {
    const goody = goodies[name];
    if (goody.imports.length === 0) {
      pq.push(name);
    } else {
      unsatisfiedDependencies.set(name, new Set(goody.imports));
      for (const im of goody.imports) {
        unblocks.has(im) || unblocks.set(im, new Set());
        unblocks.get(im)!.add(name);
      }
    }
  }

  const res: string[] = [];
  while (!pq.isEmpty()) {
    const name = pq.pop()!;
    res.push(name);

    for (const unblocked of unblocks.get(name) ?? []) {
      const depsOfUnblocked = unsatisfiedDependencies.get(unblocked)!;
      depsOfUnblocked.delete(name);
      if (depsOfUnblocked.size === 0) {
        unsatisfiedDependencies.delete(unblocked);
        pq.push(unblocked);
      }
    }
  }

  invariant(unsatisfiedDependencies.size === 0, "TODO");
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

  const mergedCode = await promiseIdleCallback(() =>
    topo({ selectedGoodies, goodies })
      .map((name) => goodies[name].code)
      .join("\n\n"),
  );

  return (
    await prettierFormat(
      centerTextInComment("BEGIN ADVENTURE PACK CODE") +
        "\n" +
        `// Adventure Pack commit ${commitHash}\n` +
        `// Running at: ${window.location.href}\n\n` +
        mergedCode +
        "\n" +
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
