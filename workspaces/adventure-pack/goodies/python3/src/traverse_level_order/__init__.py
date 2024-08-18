from typing import Generator, Optional, List


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
) -> Generator[List[TreeNode], None, None]:
    level = [root] if root else []
    while level:
        yield level

        level = [
            child
            for node in level
            for child in [node.left, node.right]
            if child is not None
        ]
