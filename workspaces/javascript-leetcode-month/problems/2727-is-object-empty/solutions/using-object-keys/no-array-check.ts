const isEmpty = (o: Readonly<Record<PropertyKey, unknown>>) =>
  !Object.keys(o).length;
