import { config } from "../constants.ts";
import { playSound } from "./playSound.ts";

export function playNote(freq: number): void {
  playSound(freq, config.soundDurationMs, config.volumePct);
}
