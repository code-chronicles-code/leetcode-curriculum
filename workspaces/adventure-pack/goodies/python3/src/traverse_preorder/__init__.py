from collections import deque
from typing import Generator, Optional


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        left: Optional["TreeNode"] = None,
        right: Optional["TreeNode"] = None,
    ):
        self.val = val
        self.left = left
        self.right = right


def traverse_preorder(root: Optional[TreeNode]) -> Generator[int, None, None]:
    stack = [root]
    while stack:
        node = stack.pop()

        if node:
            yield node.val
            stack.append(node.right)
            stack.append(node.left)
