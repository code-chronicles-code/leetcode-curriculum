export function shiftOctaves(freq: number, octaves: number): number {
  return freq * 2 ** octaves;
}
