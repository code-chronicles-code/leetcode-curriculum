package iterable_int_stream;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Iterator;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.stream.LongStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@SuppressWarnings("overloads")
public interface IterableLongStream extends Iterable<Long>, LongStream {
  @Override
  public Spliterator.OfLong spliterator();

  public static IterableLongStream from(final Iterable<Long> iterable) {
    return from(iterable.spliterator());
  }

  public static IterableLongStream from(final Iterator<Long> iterator) {
    return from(() -> iterator);
  }

  public static IterableLongStream from(final Spliterator<Long> spliterator) {
    return from(StreamSupport.stream(spliterator, false));
  }

  public static IterableLongStream from(final Spliterator.OfLong spliterator) {
    return from(StreamSupport.longStream(spliterator, false));
  }

  public static IterableLongStream from(final Stream<Long> stream) {
    return from(stream.mapToLong(Long::longValue));
  }

  public static IterableLongStream from(final LongStream stream) {
    @SuppressWarnings("unchecked")
    var proxy = (IterableLongStream) Proxy.newProxyInstance(
      ClassLoader.getSystemClassLoader(),
      new Class<?>[] { IterableLongStream.class },
      (Object _proxy, Method method, Object[] args) ->
        LongStream.class.getMethod(
            method.getName(),
            method.getParameterTypes()
          ).invoke(stream, args)
    );
    return proxy;
  }
}
