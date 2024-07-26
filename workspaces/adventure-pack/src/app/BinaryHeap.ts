import { swap } from "@code-chronicles/util/swap";

// TODO: find a way to keep the code in sync with the BinaryHeap goody

export class BinaryHeap<T> {
  private readonly items: T[] = [];

  constructor(private readonly compareFn: (a: T, b: T) => number) {}

  push(item: T): void {
    this.items.push(item);
    this.bubbleUp(this.size - 1);
  }

  peek(): T | undefined {
    return this.items[0];
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    swap(this.items, 0, this.size - 1);
    const res = this.items.pop();
    this.bubbleDown(0);
    return res;
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  private static getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private static getChildIndexes(index: number): [number, number] {
    // TODO: investigate whether listing the right child first can offer a
    // performance boost in bubbleDown(), due to favoring the side of the
    // tree that may be smaller
    return [2 * index + 1, 2 * index + 2];
  }

  private bubbleUp(index: number): void {
    if (index === 0) {
      return;
    }

    const parentIndex = BinaryHeap.getParentIndex(index);
    if (this.compareFn(this.items[index], this.items[parentIndex]) < 0) {
      swap(this.items, index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  private bubbleDown(index: number): void {
    let bestIndex = index;
    for (const childIndex of BinaryHeap.getChildIndexes(index)) {
      if (
        childIndex < this.size &&
        this.compareFn(this.items[childIndex], this.items[bestIndex]) < 0
      ) {
        bestIndex = childIndex;
      }
    }

    if (bestIndex !== index) {
      swap(this.items, index, bestIndex);
      this.bubbleDown(bestIndex);
    }
  }
}
