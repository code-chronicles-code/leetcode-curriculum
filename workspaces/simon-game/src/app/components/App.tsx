import React from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

export function App() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {config.boxes.map((box) => (
        <Box color={box.color} onClick={() => playNote(box.frequency)} />
      ))}
    </div>
  );
}
