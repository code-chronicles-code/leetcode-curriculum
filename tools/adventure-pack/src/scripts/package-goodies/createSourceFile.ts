import { Project as TSProject, SourceFile as TSSourceFile } from "ts-morph";

export function createSourceFile(code: string): TSSourceFile {
  return new TSProject({ useInMemoryFileSystem: true }).createSourceFile(
    "not/a/real/file",
    code,
  );
}
