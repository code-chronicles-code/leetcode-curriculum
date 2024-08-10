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
    if not root:
        return
    yield root.val
    yield from traverse_preorder(root.left)
    yield from traverse_preorder(root.right)
