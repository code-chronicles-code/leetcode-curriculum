import React, { useState } from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

export function App() {
  const [playerMoves, setPlayerMoves] = useState<readonly number[]>([]);
  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        {config.boxes.map((box, index) => (
          <Box
            key={index}
            color={box.color}
            onClick={() => {
              playNote(box.frequency);
              setPlayerMoves((prev) => [...prev, index]);
            }}
          />
        ))}
      </div>
      <pre>{JSON.stringify(playerMoves, null, 2)}</pre>
    </>
  );
}
