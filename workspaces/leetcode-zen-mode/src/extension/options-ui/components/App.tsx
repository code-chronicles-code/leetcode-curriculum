import React from "react";

import {
  usePreferredDifficulty,
  DIFFICULTIES,
  type Difficulty,
} from "../../usePreferredDifficulty.ts";

function Options() {
  const [preferredDifficulty, setPreferredDifficulty] =
    usePreferredDifficulty();

  return (
    <div>
      <label>
        Difficulty to rewrite to:{" "}
        <select
          value={preferredDifficulty}
          onChange={(ev) =>
            setPreferredDifficulty(ev.target.value as Difficulty)
          }
        >
          {DIFFICULTIES.map((difficultyOption) => (
            <option key={difficultyOption} value={difficultyOption}>
              {difficultyOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// TODO: call this something besides App
export function App() {
  return (
    <React.Suspense>
      <Options />
    </React.Suspense>
  );
}
