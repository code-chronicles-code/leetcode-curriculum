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


def traverse_inorder(
    root: Optional[TreeNode],
) -> Generator[TreeNode, None, None]:
    stack = [(root, False)]
    while stack:
        node, did_traverse_left_child = stack.pop()
        if not node:
            continue

        if did_traverse_left_child:
            yield node
            continue

        stack.append((node.right, False))
        stack.append((node, True))
        stack.append((node.left, False))
