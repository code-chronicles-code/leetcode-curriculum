const sortBy = <T>(arr: T[], fn: (value: T) => number): T[] =>
  arr
    .map((element) => `${1.1e10 + fn(element)} ${JSON.stringify(element)}`)
    .sort()
    .map((sortKeyAndElement) =>
      JSON.parse(sortKeyAndElement.replace(/^\d+ /, "")),
    );
