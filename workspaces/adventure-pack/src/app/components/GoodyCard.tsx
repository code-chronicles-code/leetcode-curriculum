import React from "react";

import type { Goody } from "../Goody.ts";
import { stringifyGoody } from "../stringifyGoody.ts";
import { HighlightedCode } from "./HighlightedCode.tsx";

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
