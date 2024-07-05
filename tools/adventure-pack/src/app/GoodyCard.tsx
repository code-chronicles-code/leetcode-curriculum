import React from "react";

import type { Goody } from "./Goody";
import { HighlightedCode } from "./HighlightedCode";

type Props = {
  goody: Goody;
};

export function GoodyCard({ goody }: Props) {
  return (
    <div>
      <h2>{goody.name}</h2>
      <HighlightedCode language={goody.language}>
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
