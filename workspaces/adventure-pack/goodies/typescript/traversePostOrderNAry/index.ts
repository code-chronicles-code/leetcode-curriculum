export function* traversePostOrderNAry<T extends { children: T[] }>(
  root: T | null | undefined,
): Generator<T, void, void> {
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

    stack.push([node, true]);
    // TODO: add an Array.prototype.valuesReversed() goody and use it here
    for (let i = node.children.length - 1; i >= 0; --i) {
      stack.push([node.children[i], false]);
    }
  } while (stack.length > 0);
}
