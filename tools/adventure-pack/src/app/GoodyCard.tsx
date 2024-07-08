import React from "react";

import type { Goody } from "./Goody";
import { goodyToText } from "./goodyToText";
import { HighlightedCode } from "./HighlightedCode";

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
