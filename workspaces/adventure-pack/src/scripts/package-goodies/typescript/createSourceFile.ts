import {
  Project as TSProject,
  type SourceFile as TSSourceFile,
} from "ts-morph";

export function createSourceFile(code: string): TSSourceFile {
  return new TSProject({ useInMemoryFileSystem: true }).createSourceFile(
    "not/a/real/file",
    code,
  );
}
