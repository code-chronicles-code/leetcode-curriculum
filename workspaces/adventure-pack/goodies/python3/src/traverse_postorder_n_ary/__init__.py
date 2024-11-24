from typing import Generator, Optional, List


class TreeNode:
    def __init__(
        self,
        val: int = 0,
        children: List["TreeNode"] = [],
    ):
        self.val = val
        self.children = children


def traverse_postorder_n_ary(
    root: Optional[TreeNode],
) -> Generator[TreeNode, None, None]:
    stack = [(root, False)]
    while stack:
        node, did_traverse_children = stack.pop()
        if not node:
            continue

        if did_traverse_children:
            yield node
            continue

        stack.append((node, True))
        for child in reversed(node.children):
            stack.append((child, False))
