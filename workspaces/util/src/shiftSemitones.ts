import { shiftOctaves } from "@code-chronicles/util/shiftOctaves";

export function shiftSemitones(freq: number, semitones: number): number {
  return shiftOctaves(freq, semitones / 12);
}
