import React from "react";
import { buttonSoundConfig } from "../constants.ts";
import playSound from "../util/playSound.ts";

import { Box } from "./Box.tsx";

export function App() {
  let audioContext: AudioContext | null = null;

  const handleFreqClick = (freq: number) => {
    if(!audioContext) {
      audioContext = new window.AudioContext();
    }
    playSound(
      audioContext,
      freq,
      buttonSoundConfig.duration,
      buttonSoundConfig.volume,
    )
  }

  return (
    <div>
      {buttonSoundConfig.frequencies.map((freq, index) => (
        <button
          key={index}
          onClick={() => handleFreqClick(freq)}
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
