package iterable_stream;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Iterator;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public interface IterableStream<T> extends Iterable<T>, Stream<T> {
  @Override
  public void forEach(Consumer<? super T> action);

  @Override
  public Spliterator<T> spliterator();

  public static <T> IterableStream<T> from(final Iterable<T> iterable) {
    return from(iterable.spliterator());
  }

  public static <T> IterableStream<T> from(final Iterator<T> iterator) {
    return from(() -> iterator);
  }

  public static <T> IterableStream<T> from(final Spliterator<T> spliterator) {
    return from(StreamSupport.stream(spliterator, false));
  }

  public static <T> IterableStream<T> from(final Stream<T> stream) {
    @SuppressWarnings("unchecked")
    var proxy = (IterableStream<T>) Proxy.newProxyInstance(
      ClassLoader.getSystemClassLoader(),
      new Class<?>[] { IterableStream.class },
      (Object _proxy, Method method, Object[] args) ->
        Stream.class.getMethod(
            method.getName(),
            method.getParameterTypes()
          ).invoke(stream, args)
    );
    return proxy;
  }
}
