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
