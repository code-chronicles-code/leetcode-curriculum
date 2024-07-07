import React from "react";

import type { Goody } from "./Goody";
import { HighlightedCode } from "./HighlightedCode";
import { mergeJavaCode } from "./mergeJavaCode";

function goodyToText(goody: Goody): string {
  switch (goody.language) {
    case "java": {
      return (
        `package ${goody.packageName};\n\n` +
        goody.importsCode +
        mergeJavaCode([goody])
      ).trim();
    }
    case "javascript": {
      return (
        goody.imports.map((im) => `import ${JSON.stringify(im)};\n`).join("") +
        "\n" +
        goody.code
      ).trim();
    }
    case "python3": {
      return goody.code.trim();
    }
    case "typescript": {
      return (
        goody.imports.map((im) => `import ${JSON.stringify(im)};\n`).join("") +
        "\n" +
        (goody.globalModuleDeclarations.length > 0
          ? `declare global {\n  ${goody.globalModuleDeclarations
              .join("\n\n")
              .trim()}\n}\n\n`
          : "") +
        goody.code
      ).trim();
    }
  }

  // @ts-expect-error Switch should be exhaustive.
  console.error("Unsupported goody language:", goody);
  // @ts-expect-error Switch should be exhaustive.
  return goody.code;
}

type Props = {
  goody: Goody;
};

export function GoodyCard({ goody }: Props) {
  return (
    <div>
      <h2>{goody.name}</h2>
      <HighlightedCode language={goody.language}>
        {goodyToText(goody)}
      </HighlightedCode>
    </div>
  );
}
