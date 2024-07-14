package traverse_inorder;

import static to_iterable.AP.*;

import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Stack;
import pair.Pair;
import simple_iterator.SimpleIterator;

public final class AP {

  public static Iterable<TreeNode> traverseInorder(final TreeNode root) {
    final var stack = new Stack<Pair<TreeNode, Boolean>>();
    stack.push(new Pair<>(root, false));

    return toIterable(
      SimpleIterator.toIterator(() -> {
        while (!stack.isEmpty()) {
          var nodeAndDidTraverseLeftChild = stack.pop();

          var node = nodeAndDidTraverseLeftChild.first();
          if (node == null) {
            continue;
          }

          if (nodeAndDidTraverseLeftChild.second()) {
            return node;
          }

          stack.push(new Pair<>(node.right, false));
          stack.push(new Pair<>(node, true));
          stack.push(new Pair<>(node.left, false));
        }

        throw new NoSuchElementException();
      })
    );
  }
}

class TreeNode {

  // TODO: support comments outside a class in code extraction

  // TODO: don't include this class in the goody, since it's automatically defined by LeetCode

  // TODO: get coreImports to be first in generated output

  // TODO: alphabetize classes when merging Java code

  TreeNode left, right;
}
