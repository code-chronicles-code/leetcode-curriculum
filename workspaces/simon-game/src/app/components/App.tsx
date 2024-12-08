import React, { useState } from "react";

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

  switch (gameState) {
    case "cpu-turn": {
      return (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            {config.boxes.map((box, index) => (
              <Box
                key={index}
                color={box.color}
                onClick={() => {
                  playNote(box.frequency);
                  setPlayerMoves(() => {
                    const newPlayerMoves = [...playerMoves, index];
                    const isSequenceCorrect = isPrefixCorrect(
                      newPlayerMoves,
                      correctMoves,
                    );
                    if (!isSequenceCorrect) {
                      setGameState("game-over");
                      return newPlayerMoves;
                    }
                    if (newPlayerMoves.length === correctMoves.length) {
                      setGameState("cpu-turn");
                      return [];
                    }
                    setGameState("player-turn");
                    return newPlayerMoves;
                  });
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
    case "game-over": {
      return (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            {config.boxes.map((box, index) => (
              <Box
                key={index}
                color={box.color}
                onClick={() => {
                  playNote(box.frequency);
                  setPlayerMoves(() => {
                    const newPlayerMoves = [...playerMoves, index];
                    const isSequenceCorrect = isPrefixCorrect(
                      newPlayerMoves,
                      correctMoves,
                    );
                    if (!isSequenceCorrect) {
                      setGameState("game-over");
                      return newPlayerMoves;
                    }
                    if (newPlayerMoves.length === correctMoves.length) {
                      setGameState("cpu-turn");
                      return [];
                    }
                    setGameState("player-turn");
                    return newPlayerMoves;
                  });
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
          <button
            onClick={() => {
              setGameState("cpu-turn");
              setCorrectMoves((prev) => [...prev, randNum(4)]); // TODO: Add to cpu-turn state instead once created
            }}
          >
            Start Game
          </button>
          Simon Game
        </div>
      );
    }
  }
}
