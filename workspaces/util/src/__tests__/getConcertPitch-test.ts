import { describe, expect, it } from "@jest/globals";

import { getConcertPitch } from "../getConcertPitch.ts";

describe("getConcertPitch", () => {
  it("respects the pitch standard", () => {
    expect(getConcertPitch("C4")).toBeCloseTo(261.6256, 4);
    expect(getConcertPitch("C#4")).toBeCloseTo(277.1826, 4);
    expect(getConcertPitch("Db4")).toBeCloseTo(277.1826, 4);
    expect(getConcertPitch("D4")).toBeCloseTo(293.6648, 4);
    expect(getConcertPitch("D#4")).toBeCloseTo(311.127, 4);
    expect(getConcertPitch("Eb4")).toBeCloseTo(311.127, 4);
    expect(getConcertPitch("E4")).toBeCloseTo(329.6276, 4);
    expect(getConcertPitch("F4")).toBeCloseTo(349.2282, 4);
    expect(getConcertPitch("F#4")).toBeCloseTo(369.9944, 4);
    expect(getConcertPitch("Gb4")).toBeCloseTo(369.9944, 4);
    expect(getConcertPitch("G4")).toBeCloseTo(391.9954, 4);
    expect(getConcertPitch("G#4")).toBeCloseTo(415.3047, 4);
    expect(getConcertPitch("Ab4")).toBeCloseTo(415.3047, 4);
    expect(getConcertPitch("A4")).toBe(440);
    expect(getConcertPitch("A#4")).toBeCloseTo(466.1638, 4);
    expect(getConcertPitch("Bb4")).toBeCloseTo(466.1638, 4);
    expect(getConcertPitch("B4")).toBeCloseTo(493.8833, 4);
  });

  it("supports octaves", () => {
    // Test some specific familiar frequencies.
    expect(getConcertPitch("A1")).toBe(55);
    expect(getConcertPitch("A2")).toBe(110);
    expect(getConcertPitch("A3")).toBe(220);
    expect(getConcertPitch("A5")).toBe(880);
    expect(getConcertPitch("A6")).toBe(1760);
    expect(getConcertPitch("A7")).toBe(3520);
    expect(getConcertPitch("A8")).toBe(7040);

    // Test all the notes more thoroughly.
    for (const note of "ABCDEFG") {
      const baseline = getConcertPitch(`${note}4`);
      for (let octave = -10; octave < 4; ++octave) {
        expect(getConcertPitch(note + octave)).toBeCloseTo(
          baseline / 2 ** (4 - octave),
        );
      }
      for (let octave = 4; octave < 20; ++octave) {
        expect(getConcertPitch(note + octave)).toBeCloseTo(
          baseline * 2 ** (octave - 4),
        );
      }
    }
  });

  // TODO: test multiple sharps and flats

  // TODO: test a different tuning besides A440

  // TODO: test that note can be uppercase or lowercase

  // TODO: test some invalid inputs
});
