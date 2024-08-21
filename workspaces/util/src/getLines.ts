export function* getLines(text: string): Generator<string, void, void> {
  for (const [line] of text.matchAll(/[^\n\v\f\r]+(\n|\r|\v|\f)?|(\n|\r|\v|\f)/g)) {
    yield line;
  }
}
