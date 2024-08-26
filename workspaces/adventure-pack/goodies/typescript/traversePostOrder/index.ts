export function* traversePostOrder<
  T extends { left?: T | null | undefined; right?: T | null | undefined },
>(root: T | null | undefined): Generator<T, void, void> {
  const stack: [T | null | undefined, boolean][] = [[root, false]];

  do {
    const [node, didTraverseChildren] = stack.pop()!;
    if (node == null) {
      continue;
    }

    if (didTraverseChildren) {
      yield node;
      continue;
    }

    stack.push([node, true], [node.right, false], [node.left, false]);
  } while (stack.length > 0);
}
