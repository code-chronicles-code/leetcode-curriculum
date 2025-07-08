from . import *


def test_flatten():
    input_ = [[3, 1, 4, 1], [[5, 9, [2, 6]], [5, 3, 5]], 8, 9]
    expected = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9]
    flattened = list(flatten(input_))
    assert expected == flattened


def test_flatten_random_types():
    dictionary = {"something": "something_else"}
    l = [["hi", -80, "c", 0.0], [[(3, 3), dictionary, 6], [5, 4, 3]], 2, 1, 0]
    flattened = list(flatten(l))
    expected = ["hi", -80, "c", 0.0, (3, 3), dictionary, 6, 5, 4, 3, 2, 1, 0]
    assert flattened == expected


def test_flatten_with_depth_0():
    # Test with depth=0 (no flattening)
    input_ = [1, [2, [3, [4, 5]]]]
    assert list(flatten(input_, depth=0)) == input_


def test_flatten_with_depth_2():
    # Test with depth=2
    input_ = [1, [2, [3, [4, 5]]]]
    expected = [1, 2, 3, [4, 5]]
    assert list(flatten(input_, depth=2)) == expected


def test_flatten_with_depth_greater_than_needed():
    # Test with depth larger than needed
    input_ = [1, [2, [3, [4, 5]]]]
    expected = [1, 2, 3, 4, 5]
    assert list(flatten(input_, depth=10)) == expected


def test_flatten_with_empty_lists():
    # Test with empty lists at different levels
    input_ = [[], [1, [2, [], [3, []]], 4], []]
    assert list(flatten(input_, depth=1)) == [1, [2, [], [3, []]], 4]
    assert list(flatten(input_, depth=2)) == [1, 2, [], [3, []], 4]
    assert list(flatten(input_)) == [1, 2, 3, 4]


def test_flatten_non_list_input():
    # Test with non-list input
    assert list(flatten(42)) == [42]
    assert list(flatten("hello")) == ["hello"]
    assert list(flatten(None)) == [None]
