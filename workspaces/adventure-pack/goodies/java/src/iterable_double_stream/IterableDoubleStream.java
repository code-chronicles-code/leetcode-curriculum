package iterable_double_stream;

import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Iterator;
import java.util.Spliterator;
import java.util.function.Consumer;
import java.util.function.IntConsumer;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@SuppressWarnings("overloads")
public interface IterableDoubleStream extends Iterable<Double>, DoubleStream {
  @Override
  public Spliterator.OfDouble spliterator();

  public static IterableDoubleStream from(final Iterable<Double> iterable) {
    return from(iterable.spliterator());
  }

  public static IterableDoubleStream from(final Iterator<Double> iterator) {
    return from(() -> iterator);
  }

  public static IterableDoubleStream from(final Spliterator<Double> spliterator) {
    return from(StreamSupport.stream(spliterator, false));
  }

  public static IterableDoubleStream from(final Spliterator.OfDouble spliterator) {
    return from(StreamSupport.doubleStream(spliterator, false));
  }

  public static IterableDoubleStream from(final Stream<Double> stream) {
    return from(stream.mapToDouble(i -> i));
  }

  public static IterableDoubleStream from(final DoubleStream stream) {
    @SuppressWarnings("unchecked")
    var proxy = (IterableDoubleStream) Proxy.newProxyInstance(
      ClassLoader.getSystemClassLoader(),
      new Class<?>[] { IterableDoubleStream.class },
      (Object _proxy, Method method, Object[] args) ->
        DoubleStream.class.getMethod(
            method.getName(),
            method.getParameterTypes()
          ).invoke(stream, args)
    );
    return proxy;
  }
}
