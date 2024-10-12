function Null() {
  return null;
}

export function patchJsxFactory<TThis, TArgs extends unknown[], TRes>(
  createFn: (this: TThis, ...args: TArgs) => TRes,
): (this: TThis, ...args: TArgs) => TRes {
  return function () {
    try {
      const props = arguments[1] ?? {};

      // Remove the Difficulty dropdown on `/problemset/`. The dropdown is
      // implemented as a React element with an `items` prop which is an
      // array. We'll replace it with a React element that renders nothing.
      if (
        Array.isArray(props.items) &&
        props.items.some((it: Record<string, unknown>) => it.value === "EASY")
      ) {
        return createFn.apply(this, [Null, {}] as Parameters<typeof createFn>);
      }

      // Update the session progress component on `/problemset/` to show a
      // single entry, based on the total number of problems.
      if (props.userSessionProgress) {
        for (const key of ["progresses", "submitPercentages"]) {
          if (Array.isArray(props.userSessionProgress[key])) {
            const total = props.userSessionProgress[key].find(
              (it: Record<string, unknown>) => it.difficulty === "TOTAL",
            );

            props.userSessionProgress[key] = [
              total,
              { ...total, difficulty: "EASY" },
            ];
          }
        }
      }
    } catch (err) {
      console.error(err);
    }

    return createFn.apply(
      this,
      Array.from(arguments) as Parameters<typeof createFn>,
    );
  };
}
