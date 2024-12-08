import React, { useEffect, useState } from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

// TODO: Make this a reusable utility
function isPrefixCorrect(
  prefix: readonly number[],
  correct: readonly number[],
): boolean {
  return prefix.every((element, i) => element === correct[i]);
}

type GameState = "pre-game" | "game-over" | "player-turn" | "cpu-turn";

// TODO: Move this to a new file later
function randNum(upperBound: number): number {
  return Math.floor(Math.random() * upperBound);
}

export function App() {
  const [playerMoves, setPlayerMoves] = useState<readonly number[]>([]);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [correctMoves, setCorrectMoves] = useState<readonly number[]>([]);

  useEffect(() => {
    if (gameState !== "cpu-turn") {
      return;
    }
    setCorrectMoves((prev) => [...prev, randNum(4)]);
    setPlayerMoves([]);
    setGameState("player-turn");
  }, [gameState]);

  const newGame = () => {
    setGameState("cpu-turn");
    setCorrectMoves([]); // TODO: Add to cpu-turn state instead once created
    setPlayerMoves([]);
  };

  switch (gameState) {
    case "cpu-turn": {
      return (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            {config.boxes.map((box, index) => (
              <Box key={index} color={box.color} isDisabled />
            ))}
          </div>
          <pre>Game State: {gameState}</pre>
          <pre>Player Moves: {JSON.stringify(playerMoves, null, 2)}</pre>
          <pre>Correct Moves: {JSON.stringify(correctMoves, null, 2)}</pre>
        </>
      );
    }
    case "game-over": {
      return (
        <>
          <h1>Game Over ... Start again ...</h1>
          <button onClick={newGame}>New Game</button>
        </>
      );
    }
    case "player-turn": {
      return (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            {config.boxes.map((box, index) => (
              <Box
                key={index}
                color={box.color}
                onClick={() => {
                  playNote(box.frequency);
                  const newPlayerMoves = [...playerMoves, index];
                  setPlayerMoves(newPlayerMoves);
                  if (!isPrefixCorrect(newPlayerMoves, correctMoves)) {
                    setGameState("game-over");
                  } else if (newPlayerMoves.length === correctMoves.length) {
                    setGameState("cpu-turn");
                  }
                }}
              />
            ))}
          </div>
          <pre>Game State: {gameState}</pre>
          <pre>Player Moves: {JSON.stringify(playerMoves, null, 2)}</pre>
          <pre>Correct Moves: {JSON.stringify(correctMoves, null, 2)}</pre>
        </>
      );
    }
    case "pre-game": {
      return (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={newGame}>Start Game</button>
          Simon Game
        </div>
      );
    }
  }
}
