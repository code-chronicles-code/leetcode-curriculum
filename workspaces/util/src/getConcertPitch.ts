import nullthrows from "nullthrows";

import { assertIsIntegerString } from "@code-chronicles/util/assertIsIntegerString";
import { shiftOctaves } from "@code-chronicles/util/shiftOctaves";
import { shiftSemitones } from "@code-chronicles/util/shiftSemitones";

const NOTES = {
  c: -9,
  d: -7,
  e: -5,
  f: -4,
  g: -2,
  a: 0,
  b: 2,
} as const;

const ACCIDENTALS = {
  "#": 1,
  b: -1,
} as const;

export function getConcertPitch(note: string, a4Pitch: number = 440): number {
  let semitones = nullthrows(
    NOTES[note[0].toLowerCase() as keyof typeof NOTES],
    "Invalid note!",
  );

  let index = 1;
  while (Object.hasOwn(ACCIDENTALS, note[index])) {
    semitones += ACCIDENTALS[note[index++] as keyof typeof ACCIDENTALS];
  }

  const octaves = assertIsIntegerString(note.slice(index)) - 4;

  return shiftSemitones(shiftOctaves(a4Pitch, octaves), semitones);
}
