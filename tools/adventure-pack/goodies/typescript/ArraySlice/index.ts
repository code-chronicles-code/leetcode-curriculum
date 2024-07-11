type ArraySliceProxyHandler<T> = {
  get(
    target: ArraySlice<T>,
    property: PropertyKey,
    receiver: ArraySlice<T>,
  ): unknown;
};

export type IndexableArraySlice<T> = ArraySlice<T> & {
  [index: number]: T | undefined;
};

export class ArraySlice<T> {
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

  *[Symbol.iterator](this: ArraySlice<T>): Generator<T, void, void> {
    for (let i = this.start; i <= this.end; ++i) {
      yield this.array[i];
    }
  }

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
        property: PropertyKey,
        receiver: ArraySlice<unknown>,
      ): unknown {
        if (typeof property === "string" || typeof property === "number") {
          const index = parseInt(String(property), 10);
          if (String(index) === String(property)) {
            if (index < 0 || index >= receiver.length) {
              return undefined;
            }
            return receiver.at(index);
          }
        }

        return (target as unknown as Record<PropertyKey, unknown>)[property];
      },
    };

    return new Proxy(
      new ArraySlice(array, start, end),
      ArraySlice.proxyHandler as ArraySliceProxyHandler<T>,
    ) as IndexableArraySlice<T>;
  }
}
