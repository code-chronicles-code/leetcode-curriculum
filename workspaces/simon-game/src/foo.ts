const ESCAPES: Record<string, string | undefined> = {
  '"': '\\"',
  "\\": "\\\\",
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
};

function stringifyJSON(data: unknown): string {
  if (typeof data === "number") {
    return String(data);
  }
  if (typeof data === "boolean") {
    return data ? "true" : "false";
  }
  if (typeof data === "string") {
    return '"' + [...data].map((c) => ESCAPES[c] ?? c).join("") + '"';
  }
  if (typeof data === "object") {
    // eslint-disable-next-line eqeqeq
    if (data === null) {
      return "null";
    }
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return "[]";
      }

      return "[" + data.map(stringifyJSON).join(",") + "]";
    }

    const entries = Object.entries(data);
    if (entries.length === 0) {
      return "{}";
    }
    return (
      "{" +
      entries.map(
        ([key, value]) => `${stringifyJSON(key)}:${stringifyJSON(value)}`,
      ) +
      "}"
    );
  }

  throw new Error("Unknown Type");
}

console.log(stringifyJSON({ 1: "world", 2: { hello: "world2" } }));
console.log(stringifyJSON([0, 1, -3, [-4, 5, [2]]]));
