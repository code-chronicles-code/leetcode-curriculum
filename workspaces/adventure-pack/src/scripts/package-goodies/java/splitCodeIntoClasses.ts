import invariant from "invariant";

import { compareStringsCaseInsensitive } from "@code-chronicles/util/compareStringsCaseInsensitive";
import { getLines } from "@code-chronicles/util/getLines";
import { isStringEmptyOrWhitespaceOnly } from "@code-chronicles/util/isStringEmptyOrWhitespaceOnly";
import { mapObjectValues } from "@code-chronicles/util/mapObjectValues";

const CLASSES_TO_IGNORE: ReadonlySet<string> = new Set(["TreeNode"]);

// TODO: refactor into some kind of easier to maintain state machine!
export function splitCodeIntoClasses(
  code: string,
): Record<string, { code: string; declaration: string }> {
  const classes: Record<string, { code: string[]; declaration: string }> = {};

  let currentClassName: string | null = null;
  let isInMultiLineComment = false;
  const annotations = [];
  const multiLineComment = [];
  for (const line of getLines(code)) {
    if (isInMultiLineComment) {
      multiLineComment.push(line);
      if (line.includes("*/")) {
        isInMultiLineComment = false;
      }
      continue;
    }

    if (line.startsWith("/*")) {
      isInMultiLineComment = true;
      multiLineComment.push(line);
      continue;
    }

    if (/^\@\S.*$/s.test(line)) {
      invariant(
        currentClassName == null,
        "Top-level annotation inside a class?",
      );
      annotations.push(line);
      continue;
    }

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
        declaration:
          multiLineComment.join("") +
          annotations.join("") +
          [
            ...Array.from(modifiers).sort(compareStringsCaseInsensitive),
            classMatch[2].replace(/}?\n*$/, ""),
          ]
            .filter(Boolean)
            .join(" "),
      };
      annotations.length = 0;
      multiLineComment.length = 0;

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
  invariant(annotations.length === 0, "Orphaned annotations?");
  invariant(multiLineComment.length === 0, "Orphaned multi-line comment?");

  for (const classToIgnore of CLASSES_TO_IGNORE) {
    delete classes[classToIgnore];
  }

  return mapObjectValues(classes, ({ code, declaration }) => ({
    code: code.join("").replace(/^\n+/, "").replace(/\n+$/, ""),
    declaration,
  }));
}
