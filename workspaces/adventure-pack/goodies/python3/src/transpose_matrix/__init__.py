from typing import TypeVar

matrix_element = TypeVar("matrix_element")


def transpose_matrix(
    input: list[list[matrix_element]],
) -> list[list[matrix_element]]:
    r = len(input)
    c = len(input[0]) if r != 0 else 0
    if r == 0 or c == 0:
        raise ValueError("Can't transpose a matrix that has a 0 dimension")
    if any(len(row) != c for row in input):
        raise ValueError("Matrix has rows of different lengths")

    return [list(tup) for tup in zip(*input)]
