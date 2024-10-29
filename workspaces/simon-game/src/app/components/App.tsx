import React from "react";
import { buttonSoundConfig } from "../constants.ts";
import { playSound } from "../util/playSound.ts";

import { Box } from "./Box.tsx";

let audioContext: AudioContext | null = null;

export function App() {
  const handleOnClick = (freq: number) =>
    playSound(
      (audioContext ??= new AudioContext()),
      freq,
      buttonSoundConfig.duration,
      buttonSoundConfig.volume,
    );

  return (
    <div style={{display: "flex", gap: 10}}>
      <Box
        color="red"
        handleClick={() => handleOnClick(buttonSoundConfig.frequencies.red)}
      />
      <Box
        color={
          // cobalt blue
          "#0050B5"
        }
        handleClick={() =>
          handleOnClick(buttonSoundConfig.frequencies.cobaltBlue)
        }
      />
      <Box
        color="green"
        handleClick={() => handleOnClick(buttonSoundConfig.frequencies.green)}
      />
      <Box
        color="yellow"
        handleClick={() => handleOnClick(buttonSoundConfig.frequencies.yellow)}
      />
    </div>
  );
}
