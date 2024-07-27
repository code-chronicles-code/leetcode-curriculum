export async function whileReturnsTrueAsync(
  action: () => Promise<boolean>,
): Promise<void> {
  // eslint-disable-next-line no-await-in-loop -- This function is inherently sequential.
  while (await action()) {}
}
