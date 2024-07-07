import invariant from "invariant";
import type { ReadonlyDeep } from "type-fest";

import type { JavaGoody } from "./parsers/javaGoodyParser";

const ADVENTURE_PACK_CLASS_NAME = "AP";

export function mergeJavaCode(goodies: Iterable<ReadonlyDeep<JavaGoody>>) {
  const classes: Record<string, { code: string[]; modifiers: Set<string> }> =
    {};
  for (const goody of goodies) {
    for (const className of Object.keys(goody.codeByClass)) {
      invariant(
        classes[className] == null || className === ADVENTURE_PACK_CLASS_NAME,
        `Only the ${ADVENTURE_PACK_CLASS_NAME} class can exist in multiple goodies!`,
      );

      classes[className] ??= { modifiers: new Set(), code: [] };
      for (const modifier of goody.codeByClass[className].modifiers) {
        classes[className].modifiers.add(modifier);
      }
      classes[className].code.push(goody.codeByClass[className].code);
    }
  }

  const adventurePackClass = classes[ADVENTURE_PACK_CLASS_NAME];
  if (adventurePackClass != null) {
    adventurePackClass.code.unshift(
      `  private ${ADVENTURE_PACK_CLASS_NAME}() {}`,
    );
  }

  const res: string[] = [];
  for (const className of Object.keys(classes)) {
    res.push(
      `${[...classes[className].modifiers, "class", className].join(" ")} {\n${classes[className].code.map((section) => section + "\n").join("\n")}}`,
    );
  }

  return res.join("\n\n");
}
