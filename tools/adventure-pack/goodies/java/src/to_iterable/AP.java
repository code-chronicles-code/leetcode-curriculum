import java.util.Iterator;

final class AP {

  public static <T> Iterable<T> toIterable(final Iterator<T> iterator) {
    return () -> iterator;
  }
}
