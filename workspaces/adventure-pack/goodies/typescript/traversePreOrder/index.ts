export function* traversePreOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack = [root];

  do {
    const node = stack.pop();

    if (node != null) {
      yield node;
      stack.push(node.right, node.left);
    }
  } while (stack.length > 0);
}
