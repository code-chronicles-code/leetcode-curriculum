/**
 * @goody {}
 */

type ArraySliceProxyHandler<T> = {
  get(
    target: ArraySlice<T>,
    property: string | symbol,
    receiver: ArraySlice<T>,
  ): unknown;
};

class ArraySlice<T> {
  private constructor(
    public readonly array: ReadonlyArray<T>,
    public readonly start: number,
    public readonly end: number,
  ) {}

  get length(): number {
    return this.end - this.start + 1;
  }

  at(index: number): T | undefined {
    const adjustedIndex = index < 0 ? index + this.length : index;
    return this.array[this.start + adjustedIndex];
  }

  [Symbol.iterator] = function* (
    this: ArraySlice<T>,
  ): Generator<T, void, undefined> {
    for (let i = this.start; i <= this.end; ++i) {
      yield this.array[i];
    }
  };

  slide(delta: number = 1): IndexableArraySlice<T> {
    return ArraySlice.get(this.array, this.start + delta, this.end + delta);
  }

  isPrefix(): boolean {
    return this.start === 0;
  }

  isSuffix(): boolean {
    return this.end === this.array.length - 1;
  }

  private declare static proxyHandler?: ArraySliceProxyHandler<unknown>;

  static get<T>(
    array: ReadonlyArray<T>,
    start: number,
    end: number,
  ): IndexableArraySlice<T> {
    ArraySlice.proxyHandler ??= {
      get(
        target: ArraySlice<unknown>,
        property: string | symbol,
        receiver: ArraySlice<unknown>,
      ): unknown {
        if (typeof property === "string") {
          const index = parseInt(property, 10);
          if (String(index) === property) {
            if (index < 0 || index >= receiver.length) {
              return undefined;
            }
            return receiver.at(index);
          }
        }

        return (target as unknown as Record<string | symbol, unknown>)[
          property
        ];
      },
    };

    return new Proxy(
      new ArraySlice(array, start, end),
      ArraySlice.proxyHandler as ArraySliceProxyHandler<T>,
    ) as IndexableArraySlice<T>;
  }
}

type IndexableArraySlice<T> = ArraySlice<T> & {
  [index: number]: T | undefined;
};

declare global {
  interface ReadonlyArray<T> {
    slidingWindows(windowSize: number): Generator<ArraySlice<T>, void, void>;
  }

  interface Array<T> {
    slidingWindows(windowSize: number): Generator<ArraySlice<T>, void, void>;
  }
}

Array.prototype.slidingWindows = function* <T>(
  this: ReadonlyArray<T>,
  windowSize: number,
): Generator<ArraySlice<T>, void, undefined> {
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

// Needed to fix the error "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations. ts(2669)"
// See: https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
