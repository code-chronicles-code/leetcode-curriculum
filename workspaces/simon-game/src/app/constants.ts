import { arpeggiate } from "@code-chronicles/util/arpeggiate";
import { getConcertPitch } from "@code-chronicles/util/getConcertPitch";

const [note1, note2, note3, note4] = arpeggiate(getConcertPitch("C4"), 1);

export const config = {
  soundDurationMs: 300,
  volumePct: 0.1,
  boxes: [
    {
      color: "red",
      frequency: note1,
    },
    {
      color: "#0050B5", // cobalt blue
      frequency: note2,
    },
    {
      color: "green",
      frequency: note3,
    },
    {
      color: "yellow",
      frequency: note4,
    },
  ],
};
