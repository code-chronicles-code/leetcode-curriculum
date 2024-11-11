let nextId = 0n;

export function getUniqueId(): string {
  return `i${nextId++}`;
}
