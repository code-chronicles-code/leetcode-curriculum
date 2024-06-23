export function* getLines(text: string): Generator<string, void, void> {
  for (const [line] of text.matchAll(/[^\n]+\n?|\n/g)) {
    yield line;
  }
}
