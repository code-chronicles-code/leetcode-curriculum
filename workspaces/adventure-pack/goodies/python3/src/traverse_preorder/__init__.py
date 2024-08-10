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


def traverse_preorder(
    root: Optional[TreeNode],
) -> Generator[TreeNode, None, None]:
    stack = [root] if root else []
    while stack:
        node = stack.pop()
        yield node

        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
