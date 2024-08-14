from . import *


def test_empty_tree() -> None:
    assert list(traverse_inorder(None)) == []


def test_root_only() -> None:
    root = TreeNode(10)
    assert [node.val for node in traverse_inorder(root)] == [10]


def test_left_child_only() -> None:
    root = TreeNode(10)
    root.left = TreeNode(4)
    assert [node.val for node in traverse_inorder(root)] == [4, 10]


def test_right_child_only() -> None:
    root = TreeNode(10)
    root.right = TreeNode(6)
    assert [node.val for node in traverse_inorder(root)] == [10, 6]


def test_unbalanced_tree() -> None:
    root = TreeNode(2)
    root.left = TreeNode(4)
    root.right = TreeNode(5)
    root.left.left = TreeNode(7)
    root.left.right = TreeNode(8)
    root.left.left.left = TreeNode(10)

    assert [node.val for node in traverse_inorder(root)] == [
        10,
        7,
        4,
        8,
        2,
        5,
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

    assert [node.val for node in traverse_inorder(root)] == [
        8,
        4,
        9,
        2,
        10,
        5,
        11,
        1,
        6,
        3,
        7,
    ]


# TODO: delete test case once types are enforced for python goodies
def test_traverse_generator() -> None:
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)

    traverse = traverse_inorder(root)
    assert next(traverse).val == 4
    assert next(traverse).val == 2
    assert next(traverse).val == 1
    assert next(traverse).val == 3
