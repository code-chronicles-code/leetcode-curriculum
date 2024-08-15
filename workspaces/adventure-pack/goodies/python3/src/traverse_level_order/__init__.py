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


def traverse_level_order(
    root: Optional[TreeNode],
) -> Generator[TreeNode, None, None]:
    queue = deque([root])
    while queue:
        level_len = len(queue)
        for _ in range(level_len):
            node = queue.popleft()
            if not node:
                continue

            yield node
            queue.append(node.left)
            queue.append(node.right)
