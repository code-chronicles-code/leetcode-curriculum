import invariant from "invariant";

import {
  getLines,
  isStringEmptyOrWhitespaceOnly,
  mapObjectValues,
} from "@code-chronicles/util";

import type { JavaGoody } from "../../../app/parsers/javaGoodyParser";
import { extractImports } from "./extractImports";
import { readCode } from "./readCode";
import { readMetadata } from "./readMetadata";

function splitCodeIntoClasses(
  code: string,
): Record<string, { code: string; modifiers: string[] }> {
  const classes: Record<string, { code: string[]; modifiers: Set<string> }> =
    {};

  let currentClassName: string | null = null;
  for (const line of getLines(code)) {
    const classMatch = line.match(
      /^((?:(?:abstract|final|public)\s+)*)class\s+(\S+)\s*{/,
    );
    if (classMatch != null) {
      invariant(currentClassName == null, "Top-level class nesting?");

      const modifiers = new Set(classMatch[1].trim().split(/\s+/));
      modifiers.delete("public");

      currentClassName = classMatch[2];
      classes[currentClassName] = { modifiers, code: [] };
      continue;
    }

    if (/^}\n?$/.test(line)) {
      invariant(currentClassName != null, "Top-level brace outside a class?");
      currentClassName = null;
      continue;
    }

    if (isStringEmptyOrWhitespaceOnly(line) && currentClassName == null) {
      continue;
    }

    invariant(currentClassName != null, "Code outside a class?");
    classes[currentClassName].code.push(line);
  }

  invariant(currentClassName == null, "Unfinished class?");

  return mapObjectValues(classes, ({ code, modifiers }) => ({
    code: code.join("").replace(/^\n+/, "").replace(/\n+$/, ""),
    modifiers: Array.from(modifiers),
  }));
}

export async function readBasicGoody(packageName: string): Promise<JavaGoody> {
  const [codeWithImports, { name }] = await Promise.all([
    readCode(packageName),
    readMetadata(packageName),
  ]);

  const { codeWithoutImports, imports, importsCode } =
    extractImports(codeWithImports);

  const codeByClass = splitCodeIntoClasses(codeWithoutImports);

  return {
    codeByClass,
    importedBy: [],
    imports: Array.from(imports),
    importsCode,
    name,
    language: "java",
    packageName,
  };
}
