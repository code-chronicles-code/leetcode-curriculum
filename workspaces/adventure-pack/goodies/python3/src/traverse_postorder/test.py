from . import *


def test_empty_tree() -> None:
    assert list(traverse_postorder(None)) == []


def test_root_only() -> None:
    root = TreeNode(10)
    assert [node.val for node in traverse_postorder(root)] == [10]


def test_left_child_only() -> None:
    root = TreeNode(10)
    root.left = TreeNode(4)
    assert [node.val for node in traverse_postorder(root)] == [4, 10]


def test_right_child_only() -> None:
    root = TreeNode(10)
    root.right = TreeNode(6)
    assert [node.val for node in traverse_postorder(root)] == [6, 10]


def test_unbalanced_tree() -> None:
    root = TreeNode(2)
    root.left = TreeNode(4)
    root.right = TreeNode(5)
    root.left.left = TreeNode(7)
    root.left.right = TreeNode(8)
    root.left.left.left = TreeNode(10)

    assert [node.val for node in traverse_postorder(root)] == [
        10,
        7,
        8,
        4,
        5,
        2,
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

    assert [node.val for node in traverse_postorder(root)] == [
        8,
        9,
        4,
        10,
        11,
        5,
        2,
        6,
        7,
        3,
        1,
    ]


# TODO: delete test case once types are enforced for python goodies
def test_traverse_generator() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)

    traverse = traverse_postorder(root)
    assert next(traverse).val == 4
    assert next(traverse).val == 2
    assert next(traverse).val == 3
    assert next(traverse).val == 1
