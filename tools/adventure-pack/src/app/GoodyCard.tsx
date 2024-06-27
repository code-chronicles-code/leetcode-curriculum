import React from "react";

import { HighlightedCode } from "./HighlightedCode";
import type { Goody } from "./goodyParser";

type Props = {
  goody: Goody;
};

export function GoodyCard({ goody }: Props) {
  return (
    <div>
      <h2>{goody.name}</h2>
      <HighlightedCode>
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
