import React from "react";

import { HighlightedCode } from "./HighlightedCode";
import type { Goody } from "./fetchGoodies";

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
          goody.code
        ).trim()}
      </HighlightedCode>
    </div>
  );
}
