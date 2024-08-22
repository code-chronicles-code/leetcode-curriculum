from typing import Generator, Any


def flatten(self: list[Any]) -> Generator[Any, None, None]:
    for i in self:
        if isinstance(i, list):
            yield from flatten(i)
        else:
            yield i
