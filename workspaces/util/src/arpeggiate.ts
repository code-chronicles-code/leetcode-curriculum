import { lastOrThrow } from "@code-chronicles/util/lastOrThrow";
import type { NonEmptyArray } from "@code-chronicles/util/NonEmptyArray";
import { shiftSemitones } from "@code-chronicles/util/shiftSemitones";
import { shiftOctaves } from "@code-chronicles/util/shiftOctaves";

export function arpeggiate(
  freq: number,
  octaves: number,
): NonEmptyArray<number> {
  const res: NonEmptyArray<number> = [freq];
  for (let i = 0; i < octaves; ++i) {
    const last = lastOrThrow(res);
    res.push(
      shiftSemitones(last, 4),
      shiftSemitones(last, 7),
      shiftOctaves(last, 1),
    );
  }

  return res;
}
