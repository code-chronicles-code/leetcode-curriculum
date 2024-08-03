type Node<T> = {
  element?: T;
  next?: Node<T>;
};

export class Queue<T> {
  private dummyHead: Node<T> = {};
  private tail = this.dummyHead;
  private mutableSize = 0;

  push(element: T): void {
    this.tail.next = { element };
    this.tail = this.tail.next;
    ++this.mutableSize;
  }

  peek(): T | undefined {
    return this.dummyHead.next?.element;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const res = this.peek();

    this.dummyHead.next = this.dummyHead.next?.next;
    --this.mutableSize;
    if (this.isEmpty()) {
      this.tail = this.dummyHead;
    }

    return res;
  }

  get size(): number {
    return this.mutableSize;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
