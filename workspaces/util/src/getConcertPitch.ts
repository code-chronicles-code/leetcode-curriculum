import invariant from "invariant";
import nullthrows from "nullthrows";

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

  const octaveString = note.slice(index);
  invariant(/^-?\d+/.test(octaveString), "Invalid octave!");
  const octaves = parseInt(octaveString, 10) - 4;

  return a4Pitch * Math.pow(2, octaves + semitones / 12);
}
