from typing import Any


def list_transpose(list: list[Any]) -> list[Any]:
    r = len(list)
    c = len(list[0]) if r != 0 else 0
    if r == 0 or c == 0:
        return []
    if any(len(row) != c for row in list):
        return []

    ret = [[0] * r for _ in range(c)]
    for i in range(c):
        for j in range(r):
            ret[i][j] = list[j][i]
    return ret
