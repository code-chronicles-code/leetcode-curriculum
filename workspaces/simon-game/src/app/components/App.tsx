import React, { useState } from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

type GameState = "pre-game" | "game-over" | "player-turn" | "cpu-turn";

export function App() {
  const [playerMoves, setPlayerMoves] = useState<readonly number[]>([]);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [_correctMoves, _setCorrectMoves] = useState<readonly number[]>([
    0, 1, 2, 3,
  ]);

  if (gameState === "pre-game") {
    return (
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => {
            setGameState("cpu-turn");
          }}
        >
          Start Game
        </button>
        Simon Game
      </div>
    );
  }

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
