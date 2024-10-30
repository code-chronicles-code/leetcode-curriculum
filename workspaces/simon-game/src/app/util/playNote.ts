import { config } from "../constants.ts";
import { playSound } from "./playSound.ts";

export const playNote = (freq: number) =>
  playSound(freq, config.soundDurationMs, config.volumePct);
