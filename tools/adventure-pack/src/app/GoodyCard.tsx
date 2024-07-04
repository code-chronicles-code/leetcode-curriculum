import React from "react";

import { HighlightedCode } from "./HighlightedCode";
import type { Goody } from "./goodyParser";
import type { Language } from "./languageParser";

type Props = {
  goody: Goody;
  language: Language;
};

export function GoodyCard({ goody, language }: Props) {
  return (
    <div>
      <h2>{goody.name}</h2>
      <HighlightedCode language={language}>
        {(
          goody.imports
            .sort()
            .map((im) => `import ${JSON.stringify(im)};\n`)
            .join("") +
          "\n" +
          (goody.globalModuleDeclarations.length > 0
            ? `declare global {\n  ${goody.globalModuleDeclarations
                .join("\n\n")
                .trim()}\n}\n\n`
            : "") +
          goody.code
        ).trim()}
      </HighlightedCode>
    </div>
  );
}
