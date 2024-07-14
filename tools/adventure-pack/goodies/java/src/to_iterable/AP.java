package to_iterable;

import java.util.Iterator;

public final class AP {

  public static <T> Iterable<T> toIterable(final Iterator<T> iterator) {
    return () -> iterator;
  }
}
