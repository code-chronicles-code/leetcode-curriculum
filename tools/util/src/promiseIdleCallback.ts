export function promiseIdleCallback<T>(callback: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    requestIdleCallback(() => {
      try {
        resolve(callback());
      } catch (err) {
        reject(err);
      }
    });
  });
}
