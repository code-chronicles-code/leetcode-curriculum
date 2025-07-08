from typing import Generator, TypeVar
from math import inf

T = TypeVar("T")
NestedList = T | list["nested_list"]


def flatten(
    nested_list: NestedList, depth: int = inf
) -> Generator[T, None, None]:
    """Flatten a nested list up to the specified depth.

    Args:
        nested_list: The nested list to flatten
        depth: The maximum depth to flatten. Default is infinity (flatten all levels).
    """
    for item in nested_list if isinstance(nested_list, list) else [nested_list]:
        if isinstance(item, list) and depth > 0:
            yield from flatten(item, depth - 1)
        else:
            yield item
