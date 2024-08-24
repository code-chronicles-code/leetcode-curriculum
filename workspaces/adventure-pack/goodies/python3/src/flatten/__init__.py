from typing import Generator, TypeVar

T = TypeVar("T")
NestedList = T | list["NestedList"]


def flatten(self: NestedList) -> Generator[T, None, None]:
    for i in self:
        if isinstance(i, list):
            yield from flatten(i)
        else:
            yield i
