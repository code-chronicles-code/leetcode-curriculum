export function* traversePreOrderNAry<T extends { children: T[] }>(
  root: T | null | undefined,
): Generator<T, void, void> {
  if (root == null) {
    return;
  }

  const stack: T[] = [root];

  do {
    const node = stack.pop()!;
    yield node;
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push(node.children[i]);
    }
  } while (stack.length > 0);
}
