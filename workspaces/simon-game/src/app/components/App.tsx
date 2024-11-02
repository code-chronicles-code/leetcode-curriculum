import React, { useState } from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

export function App() {
  const [playerMoves, setPlayerMoves] = useState<number[]>([]);
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {config.boxes.map((box, index) => (
        <Box
          color={box.color}
          onClick={() => {
            playNote(box.frequency);
            setPlayerMoves([...playerMoves, index]);
          }}
        />
      ))}
    </div>
  );
}
