from . import *


def test_empty_tree() -> None:
    assert list(traverse_level_order(None)) == []


def test_root_only() -> None:
    root = TreeNode(10)
    assert get_values_from_nodes(traverse_level_order(root)) == [[10]]


def test_left_child_only() -> None:
    root = TreeNode(10)
    root.left = TreeNode(4)
    assert get_values_from_nodes(traverse_level_order(root)) == [[10], [4]]


def test_right_child_only() -> None:
    root = TreeNode(10)
    root.right = TreeNode(6)
    assert get_values_from_nodes(traverse_level_order(root)) == [[10], [6]]


def test_unbalanced_tree() -> None:
    root = TreeNode(2)
    root.left = TreeNode(4)
    root.right = TreeNode(5)
    root.left.left = TreeNode(7)
    root.left.right = TreeNode(8)
    root.left.left.left = TreeNode(10)

    assert get_values_from_nodes(traverse_level_order(root)) == [
        [2],
        [4, 5],
        [7, 8],
        [10],
    ]


def test_large_tree() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    root.left.left.left = TreeNode(8)
    root.left.left.right = TreeNode(9)
    root.left.right.left = TreeNode(10)
    root.left.right.right = TreeNode(11)

    assert get_values_from_nodes(traverse_level_order(root)) == [
        [1],
        [2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
    ]


# TODO: delete test case once types are enforced for python goodies
def test_traverse_generator() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)

    traverse = traverse_level_order(root)
    assert [node.val for node in next(traverse)] == [1]
    assert [node.val for node in next(traverse)] == [2, 3]
    assert [node.val for node in next(traverse)] == [4]


def get_values_from_nodes(
    levels: Generator[List[TreeNode], None, None]
) -> List[List[int]]:
    return [[node.val for node in nodes] for nodes in levels]
