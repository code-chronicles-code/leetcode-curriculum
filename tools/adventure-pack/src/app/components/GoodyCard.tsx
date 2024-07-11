import React from "react";

import type { Goody } from "../Goody";
import { stringifyGoody } from "../stringifyGoody";
import { HighlightedCode } from "./HighlightedCode";

type Props = {
  goody: Goody;
};

export function GoodyCard({ goody }: Props) {
  return (
    <div>
      <h2>{goody.name}</h2>
      <HighlightedCode language={goody.language}>
        {stringifyGoody(goody)}
      </HighlightedCode>
    </div>
  );
}
