package simple_iterator;

import java.util.Iterator;
import java.util.NoSuchElementException;

public interface SimpleIterator<T> {
  public T next();

  static enum HasNextState {
    TRUE,
    FALSE,
    UNKNOWN,
  }

  public static <T> Iterator<T> toIterator(final SimpleIterator<T> iterator) {
    final HasNextState[] hasNextState = { HasNextState.UNKNOWN };
    final Object[] elementReserve = { null };

    return new Iterator<T>() {
      public boolean hasNext() {
        if (hasNextState[0] == HasNextState.UNKNOWN) {
          try {
            elementReserve[0] = iterator.next();
            hasNextState[0] = HasNextState.TRUE;
          } catch (NoSuchElementException e) {
            hasNextState[0] = HasNextState.FALSE;
          }
        }

        return hasNextState[0] == HasNextState.TRUE;
      }

      public T next() {
        if (hasNextState[0] == HasNextState.TRUE) {
          hasNextState[0] = HasNextState.UNKNOWN;

          @SuppressWarnings("unchecked")
          T element = (T) elementReserve[0];

          elementReserve[0] = null;
          return element;
        }

        if (hasNextState[0] == HasNextState.UNKNOWN) {
          return iterator.next();
        }

        throw new NoSuchElementException();
      }
    };
  }
}
