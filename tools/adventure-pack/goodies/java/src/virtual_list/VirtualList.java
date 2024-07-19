package virtual_list;

import java.util.AbstractList;
import java.util.function.IntFunction;

public final class VirtualList<T> extends AbstractList<T> {

  private final int size;
  private final IntFunction<T> getter;

  public VirtualList(int size, IntFunction<T> getter) {
    this.getter = getter;
    this.size = size;
  }

  public T get(int index) {
    if (index < 0 || index >= this.size) {
      throw new IndexOutOfBoundsException();
    }
    return this.getter.apply(index);
  }

  public int size() {
    return this.size;
  }
}
