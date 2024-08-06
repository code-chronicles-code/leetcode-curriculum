// TODO: Verify that this is an exhaustive list of LeetCode languages.
export const LANGUAGE_TO_FILE_EXTENSION = {
  bash: "sh",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  dart: "dart",
  elixir: "ex",
  erlang: "erl",
  golang: "go",
  java: "java",
  javascript: "js",
  kotlin: "kt",
  mssql: "sql",
  mysql: "sql",
  php: "php",
  python: "py",
  python3: "py",
  pythondata: "py",
  racket: "rkt",
  ruby: "rb",
  rust: "rs",
  scala: "scala",
  swift: "swift",
  typescript: "ts",
} as const;

export const METADATA_FILE = "submissions.jsonl";
export const HASHES_FILE = "submissions.sha512";

export const CONCURRENCY_LIMIT = 10;
