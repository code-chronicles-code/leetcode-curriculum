export function* traverseInOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack: [T | null | undefined, boolean][] = [[root, false]];

  do {
    const [node, didTraverseLeftChild] = stack.pop()!;
    if (node == null) {
      continue;
    }

    if (didTraverseLeftChild) {
      yield node;
      continue;
    }

    stack.push([node.right, false], [node, true], [node.left, false]);
  } while (stack.length > 0);
}
