import invariant from "invariant";

import {
  compareStringsCaseInsensitive,
  getLines,
  isStringEmptyOrWhitespaceOnly,
  mapObjectValues,
} from "@code-chronicles/util";

const CLASSES_TO_IGNORE: ReadonlySet<string> = new Set(["TreeNode"]);

export function splitCodeIntoClasses(
  code: string,
): Record<string, { code: string; declaration: string }> {
  const classes: Record<string, { code: string[]; declaration: string }> = {};

  let currentClassName: string | null = null;
  for (const line of getLines(code)) {
    const classMatch = line.match(
      /^((?:(?:abstract|final|public)\s+)*)((?:class|enum|interface|record)\s+(\S+)\s*(?:extends|implements|<|{).*)$/s,
    );
    if (classMatch != null) {
      invariant(currentClassName == null, "Top-level class nesting?");

      const modifiers = new Set(classMatch[1].trim().split(/\s+/));
      modifiers.delete("public");

      currentClassName = classMatch[3];
      classes[currentClassName] = {
        code: [],
        declaration: [
          ...Array.from(modifiers).sort(compareStringsCaseInsensitive),
          classMatch[2].replace(/}?\n*$/, ""),
        ]
          .filter(Boolean)
          .join(" "),
      };

      if (/}\n*$/.test(line)) {
        currentClassName = null;
      }

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

  for (const classToIgnore of CLASSES_TO_IGNORE) {
    delete classes[classToIgnore];
  }

  return mapObjectValues(classes, ({ code, declaration }) => ({
    code: code.join("").replace(/^\n+/, "").replace(/\n+$/, ""),
    declaration,
  }));
}
