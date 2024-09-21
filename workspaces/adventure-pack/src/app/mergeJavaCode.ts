import invariant from "invariant";
import type { ReadonlyDeep } from "type-fest";

import type { JavaGoody } from "./zod-types/javaGoodyZodType.ts";

const ADVENTURE_PACK_CLASS_NAME = "AP";

export function mergeJavaCode(goodies: Iterable<ReadonlyDeep<JavaGoody>>) {
  const classes: Record<string, { code: string[]; declaration: string }> = {};
  const coreImports: Set<string> = new Set();

  for (const goody of goodies) {
    for (const im of goody.coreImports) {
      coreImports.add(im);
    }

    for (const className of Object.keys(goody.codeByClass)) {
      invariant(
        classes[className] == null || className === ADVENTURE_PACK_CLASS_NAME,
        `Only the ${ADVENTURE_PACK_CLASS_NAME} class can exist in multiple goodies!`,
      );

      classes[className] ??= {
        code: [],
        declaration: goody.codeByClass[className].declaration,
      };
      classes[className].code.push(goody.codeByClass[className].code);
    }
  }

  const adventurePackClass = classes[ADVENTURE_PACK_CLASS_NAME];
  if (adventurePackClass != null) {
    adventurePackClass.code.unshift(
      `  private ${ADVENTURE_PACK_CLASS_NAME}() {}`,
    );

    delete classes[ADVENTURE_PACK_CLASS_NAME];
    classes[ADVENTURE_PACK_CLASS_NAME] = adventurePackClass;
  }

  const res: string[] = [];
  if (coreImports.size > 0) {
    res.push([...coreImports].sort().join("\n"));
  }

  for (const className of Object.keys(classes)) {
    const classData = classes[className];
    const codeSections = classData.code.filter(Boolean);

    res.push(
      codeSections.length > 0
        ? `${classData.declaration}\n${codeSections.map((codeSection) => codeSection + "\n").join("\n")}}`
        : classData.declaration + "}",
    );
  }

  return res.join("\n\n");
}
