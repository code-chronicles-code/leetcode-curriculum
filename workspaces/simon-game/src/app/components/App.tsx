import React from "react";
import { buttonSoundConfig } from "../constants.ts";
import playSound from "../util/playSound.ts";

import { Box } from "./Box.tsx";

export function App() {
  let audioContext: AudioContext | null = null;
  return (
    <div>
      {buttonSoundConfig.frequencies.map((freq, index) => (
        <button
          key={index}
          onClick={() =>
            playSound(
              (audioContext ??= new AudioContext()),
              freq,
              buttonSoundConfig.duration,
              buttonSoundConfig.volume,
            )
          }
        >
          {freq}
        </button>
      ))}
      <Box color="red" />
      <Box
        color={
          // cobalt blue
          "#0050B5"
        }
      />
      <Box color="green" />
      <Box color="yellow" />
    </div>
  );
}
