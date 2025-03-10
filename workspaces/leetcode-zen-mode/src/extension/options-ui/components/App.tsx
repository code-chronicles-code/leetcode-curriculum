import React from "react";

import { usePreferredDifficulty } from "../../usePreferredDifficulty.ts";
import { DIFFICULTIES, difficultyZodType } from "../../problemDifficulties.ts";

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
            setPreferredDifficulty(difficultyZodType.parse(ev.target.value))
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
