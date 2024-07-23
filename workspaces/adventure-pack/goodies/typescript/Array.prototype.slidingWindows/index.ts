import { type IndexableArraySlice, ArraySlice } from "../ArraySlice";

declare global {
  interface Array<T> {
    slidingWindows(
      this: ReadonlyArray<T>,
      windowSize: number,
    ): Generator<IndexableArraySlice<T>, void, void>;
  }

  interface ReadonlyArray<T> {
    slidingWindows(
      this: ReadonlyArray<T>,
      windowSize: number,
    ): Generator<IndexableArraySlice<T>, void, void>;
  }
}

Array.prototype.slidingWindows = function* <T>(
  this: ReadonlyArray<T>,
  windowSize: number,
): Generator<IndexableArraySlice<T>, void, void> {
  for (
    let win: IndexableArraySlice<T> | null = ArraySlice.get(
      this,
      0,
      windowSize - 1,
    );
    win != null;
    win = win.isSuffix() ? null : win.slide()
  ) {
    yield win;
  }
};
