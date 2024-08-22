from . import *


def test_improper_input() -> None:
    assert len(list_transpose([])) == 0
    assert len(list_transpose([[], []])) == 0
    assert len(list_transpose([[0], [0, 1]])) == 0


def assert_matrices_equal(list1, list2):
    assert len(list1) == len(list2)
    for i in range(len(list1)):
        assert len(list1[i]) == len(list2[i])
        for j in range(len(list1[i])):
            assert list1[i][j] == list2[i][j]


def test_nonsymetric_transpose() -> None:
    input_1 = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
    input_2 = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["9", "10", "11"],
    ]
    expected_1 = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]]
    expected_2 = [
        ["0", "3", "6", "9"],
        ["1", "4", "7", "10"],
        ["2", "5", "8", "11"],
    ]
    actual_1 = list_transpose(input_1)
    actual_2 = list_transpose(input_2)
    assert_matrices_equal(expected_1, actual_1)
    assert_matrices_equal(expected_2, actual_2)


def test_symetric_transpose() -> None:
    input_1 = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    expected = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
    actual = list_transpose(input_1)

    assert_matrices_equal(expected, actual)
