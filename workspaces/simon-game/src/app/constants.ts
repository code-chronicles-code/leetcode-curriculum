import { getConcertPitch } from "@code-chronicles/util/getConcertPitch";

export const config = {
  soundDurationMs: 300,
  volumePct: 0.1,
  boxes: [
    {
      color: "red",
      frequency: getConcertPitch("C4"),
    },
    {
      color: "#0050B5", // cobalt blue
      frequency: getConcertPitch("E4"),
    },
    {
      color: "green",
      frequency: getConcertPitch("G4"),
    },
    {
      color: "yellow",
      frequency: getConcertPitch("C5"),
    },
  ],
};
