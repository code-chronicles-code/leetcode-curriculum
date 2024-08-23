from typing import Generator, TypeVar

T = TypeVar("T")

nested_list = T | list["nested_list"]


def flatten(self: nested_list) -> Generator[T, None, None]:
    for i in self:
        if isinstance(i, list):
            yield from flatten(i)
        else:
            yield i
