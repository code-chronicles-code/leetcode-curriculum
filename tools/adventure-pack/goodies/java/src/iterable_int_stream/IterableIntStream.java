package iterable_int_stream;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Iterator;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.function.IntConsumer;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public interface IterableIntStream extends Iterable<Integer>, IntStream {
  @Override
  public void forEach(Consumer<? super Integer> action);

  @Override
  public void forEach(IntConsumer action);

  @Override
  public Spliterator.OfInt spliterator();

  public static IterableIntStream from(final Iterable<Integer> iterable) {
    return from(iterable.spliterator());
  }

  public static IterableIntStream from(final Iterator<Integer> iterator) {
    return from(() -> iterator);
  }

  public static IterableIntStream from(final Spliterator<Integer> spliterator) {
    return from(StreamSupport.stream(spliterator, false));
  }

  public static IterableIntStream from(final Spliterator.OfInt spliterator) {
    return from(StreamSupport.intStream(spliterator, false));
  }

  public static IterableIntStream from(final Stream<Integer> stream) {
    return from(stream.mapToInt(i -> i));
  }

  public static IterableIntStream from(final IntStream stream) {
    @SuppressWarnings("unchecked")
    var proxy = (IterableIntStream) Proxy.newProxyInstance(
      ClassLoader.getSystemClassLoader(),
      new Class<?>[] { IterableIntStream.class },
      (Object _proxy, Method method, Object[] args) ->
        IntStream.class.getMethod(
            method.getName(),
            method.getParameterTypes()
          ).invoke(stream, args)
    );
    return proxy;
  }
}
